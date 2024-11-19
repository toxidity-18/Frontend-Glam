import { useEffect, useState } from "react"

export default function SysLBottom() {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const interval = setInterval(() => {
            setVisible((v) => !v)
        }, 500) // Blink every 500ms

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="mb-8 flex items-center space-x-4 rounded-full bg-[#212121] px-6 py-3 shadow-lg">
                <div className="relative h-[30px] w-[30px] rounded-full">
                    <div
                        className="absolute inset-0 rounded-full"
                        style={{
                            backgroundImage: 'linear-gradient(0deg, #ff00cc 0%, #212121 50%)',
                            animation: 'spin 0.5s infinite linear',
                        }}
                    />
                    <div
                        className="absolute inset-0 rounded-full bg-[#212121]"
                        style={{
                            top: '7.5%',
                            left: '7.5%',
                            width: '85%',
                            height: '85%',
                        }}
                    />
                </div>
                <span
                    className={`text-sm font-medium text-white ${
                        visible ? 'opacity-100' : 'opacity-0'
                    } transition-opacity duration-300`}
                >
                    Loading
                </span>
            </div>
            <style>{`
                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    )
}
