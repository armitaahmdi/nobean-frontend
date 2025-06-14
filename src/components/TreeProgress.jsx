import { useRef, useEffect, useMemo } from "react";
import Lottie from "lottie-react";
import animationData from "../assets/images/tree-growth.json";

export default function TreeProgress({ progress, style }) {
    const lottieRef = useRef();

    useEffect(() => {
        const instance = lottieRef.current;
        const totalFrames = instance?.animationItem?.totalFrames || 100;
        const frame = Math.floor(progress * totalFrames);
        instance?.goToAndStop(frame, true);
    }, [progress]);

    const scale = useMemo(() => {
        const startScale = 2.5;
        const endScale = 1;
        const clampedProgress = Math.min(Math.max(progress, 0), 1);
        return startScale - (startScale - endScale) * clampedProgress;
    }, [progress]);

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                maxWidth: '500px',
                margin: '0 auto',
                transformOrigin: "center bottom",
                transform: `scale(${scale})`,
                transition: "transform 0.3s ease",
                ...style,
            }}
        >
            <Lottie
                lottieRef={lottieRef}
                animationData={animationData}
                loop={false}
                autoplay={false}
                style={{ width: "100%", height: "100%" }}
            />
        </div>
    );
}
