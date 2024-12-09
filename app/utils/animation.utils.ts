import { View } from '@nativescript/core';

export function animateTumbler(view: View, duration: number = 3000): Promise<void> {
    return new Promise((resolve) => {
        const initialY = view.translateY || 0;
        const distance = 40;
        const steps = duration / 50; // 50ms per step
        let currentStep = 0;

        const animate = () => {
            if (currentStep >= steps) {
                view.translateY = initialY;
                resolve();
                return;
            }

            const progress = currentStep / steps;
            const easeProgress = easeInOutCubic(progress);
            view.translateY = initialY + Math.sin(progress * Math.PI * 8) * distance * (1 - easeProgress);

            currentStep++;
            setTimeout(animate, 50);
        };

        animate();
    });
}

function easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}