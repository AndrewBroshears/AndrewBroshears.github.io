import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function makePlate() {
    const outline = new THREE.Shape();
    for (let i = 0; i < 8; i++) {
        const angle = i / 8 * Math.PI * 2 + Math.PI / 8;
        const x = Math.cos(angle) * 1.12;
        const y = Math.sin(angle) * 1.12;
        if (i === 0) outline.moveTo(x, y);
        else outline.lineTo(x, y);
    }
    outline.closePath();
    const hole = new THREE.Path();
    hole.absarc(0, 0, .44, 0, Math.PI * 2, true);
    outline.holes.push(hole);
    const geometry = new THREE.ExtrudeGeometry(outline, {
        depth: .14, bevelEnabled: true, bevelSegments: 3,
        steps: 1, bevelSize: .035, bevelThickness: .035, curveSegments: 48,
    });
    geometry.center();
    geometry.rotateX(Math.PI / 2);
    return geometry;
}

export default function AssemblyScene() {
    const mount = useRef(null);

    useEffect(() => {
        const host = mount.current;
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('webgl2', { alpha: true, antialias: true });
        if (!context) return;

        let renderer;
        let environment;
        let pmrem;
        let observer;
        let resizeObserver;
        let timeline;
        let frame = 0;
        let disposed = false;
        let visible = false;
        let contextLost = false;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(35, 1, .1, 50);
        camera.position.set(4.8, 3.8, 6.8);
        camera.lookAt(0, 0, 0);
        const assembly = new THREE.Group();
        scene.add(assembly);
        const state = { progress: 0 };
        const pointer = { x: 0, y: 0 };
        const aim = { x: 0, y: 0 };
        const geometries = new Set();
        const materials = new Set();
        const trackGeometry = geometry => { geometries.add(geometry); return geometry; };
        const material = options => {
            const value = new THREE.MeshStandardMaterial(options);
            materials.add(value);
            return value;
        };
        const layers = [];

        function render() {
            if (disposed || contextLost) return;
            aim.x += (pointer.x - aim.x) * .055;
            aim.y += (pointer.y - aim.y) * .055;
            const spread = Math.sin(state.progress * Math.PI);
            assembly.rotation.y = -.25 + state.progress * Math.PI * 1.4 + aim.x * .22;
            assembly.rotation.x = aim.y * .12;
            assembly.rotation.z = -.12 + spread * .1;
            layers.forEach((layer, index) => {
                layer.position.y = (index - 1) * (.57 + spread * .82);
                layer.rotation.y = (index - 1) * spread * .28;
            });
            renderer.render(scene, camera);
        }

        function animate() {
            frame = 0;
            if (!visible || document.hidden || disposed || contextLost) return;
            render();
            frame = requestAnimationFrame(animate);
        }

        function syncAnimation() {
            cancelAnimationFrame(frame);
            frame = 0;
            if (visible && !document.hidden && !contextLost) animate();
        }

        function onPointer(event) {
            const bounds = host.getBoundingClientRect();
            pointer.x = (event.clientX - bounds.left) / bounds.width * 2 - 1;
            pointer.y = (event.clientY - bounds.top) / bounds.height * 2 - 1;
        }

        function resetPointer() { pointer.x = 0; pointer.y = 0; }
        function loseContext(event) {
            event.preventDefault();
            contextLost = true;
            host.dataset.ready = 'false';
            cancelAnimationFrame(frame);
        }

        function cleanup() {
            disposed = true;
            cancelAnimationFrame(frame);
            timeline?.scrollTrigger?.kill();
            timeline?.kill();
            observer?.disconnect();
            resizeObserver?.disconnect();
            host.removeEventListener('pointermove', onPointer);
            host.removeEventListener('pointerleave', resetPointer);
            document.removeEventListener('visibilitychange', syncAnimation);
            canvas.removeEventListener('webglcontextlost', loseContext);
            geometries.forEach(geometry => geometry.dispose());
            materials.forEach(value => value.dispose());
            environment?.dispose();
            pmrem?.dispose();
            renderer?.dispose();
            renderer?.forceContextLoss();
            canvas.remove();
            delete host.dataset.ready;
        }

        try {
            renderer = new THREE.WebGLRenderer({ canvas, context, alpha: true, antialias: true });
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
            renderer.setClearColor(0x000000, 0);
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1.35;
            host.appendChild(canvas);

            pmrem = new THREE.PMREMGenerator(renderer);
            const room = new RoomEnvironment();
            environment = pmrem.fromScene(room, .04);
            room.dispose();
            scene.environment = environment.texture;
            scene.add(new THREE.HemisphereLight(0xfff5e4, 0x48523d, 2.4));
            const key = new THREE.DirectionalLight(0xffe1c6, 4);
            key.position.set(2, 4, 3);
            scene.add(key);
            const rim = new THREE.DirectionalLight(0xd5e4cb, 3);
            rim.position.set(-4, 2, -2);
            scene.add(rim);

            const copper = material({ color: 0xc98255, metalness: .82, roughness: .27 });
            const olive = material({ color: 0x717d60, metalness: .72, roughness: .33 });
            const porcelain = material({ color: 0xe2dbcb, metalness: .5, roughness: .26 });
            const dark = material({ color: 0x333b30, metalness: .8, roughness: .3 });
            const plateGeometry = trackGeometry(makePlate());
            const ringGeometry = trackGeometry(new THREE.TorusGeometry(.57, .045, 12, 64));
            const boltGeometry = trackGeometry(new THREE.CylinderGeometry(.055, .055, .13, 6));
            [olive, copper, porcelain].forEach((surface, index) => {
                const layer = new THREE.Group();
                layer.add(new THREE.Mesh(plateGeometry, surface));
                const ring = new THREE.Mesh(ringGeometry, copper);
                ring.rotation.x = Math.PI / 2;
                ring.position.y = .13;
                layer.add(ring);
                for (let boltIndex = 0; boltIndex < 8; boltIndex++) {
                    const angle = boltIndex / 8 * Math.PI * 2 + Math.PI / 8;
                    const bolt = new THREE.Mesh(boltGeometry, dark);
                    bolt.position.set(Math.cos(angle) * .89, .13, Math.sin(angle) * .89);
                    layer.add(bolt);
                }
                layer.position.y = (index - 1) * .57;
                layers.push(layer);
                assembly.add(layer);
            });
            const spindle = new THREE.Mesh(trackGeometry(new THREE.CylinderGeometry(.15, .15, 2.1, 32)), copper);
            assembly.add(spindle);
            const core = new THREE.Mesh(trackGeometry(new THREE.IcosahedronGeometry(.32, 0)), porcelain);
            assembly.add(core);

            resizeObserver = new ResizeObserver(() => {
                const { width, height } = host.getBoundingClientRect();
                if (!width || !height) return;
                renderer.setSize(width, height, false);
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
                render();
            });
            resizeObserver.observe(host);
            observer = new IntersectionObserver(entries => {
                visible = entries[0].isIntersecting;
                syncAnimation();
            }, { rootMargin: '80px' });
            observer.observe(host);
            timeline = gsap.to(state, {
                progress: 1, ease: 'none',
                scrollTrigger: {
                    trigger: host.closest('.journey'), start: 'top 70%', end: 'bottom 65%', scrub: .8,
                },
            });
            host.addEventListener('pointermove', onPointer);
            host.addEventListener('pointerleave', resetPointer);
            document.addEventListener('visibilitychange', syncAnimation);
            canvas.addEventListener('webglcontextlost', loseContext);
            host.dataset.ready = 'true';
        } catch {
            cleanup();
            return;
        }
        return cleanup;
    }, []);

    return <div className="assembly-canvas" ref={mount} />;
}
