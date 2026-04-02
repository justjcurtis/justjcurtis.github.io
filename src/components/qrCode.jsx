import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

export const QRByteSvg = ({
    data,
    size = 256,
    level = 'L',      // error correction: L, M, Q, H
    margin = 0        // quiet zone
}) => {
    const [svg, setSvg] = useState('')

    useEffect(() => {
        let cancelled = false

        async function generate() {
            try {
                const svgString = await QRCode.toString(data, {
                    errorCorrectionLevel: level,
                    type: 'svg',
                    margin,
                    mode: 'byte'   // tell qrcode lib to use byte mode
                })

                if (!cancelled) {
                    setSvg(svgString)
                }
            } catch (err) {
                console.error('QR generation failed:', err)
            }
        }

        generate()

        return () => {
            cancelled = true
        }
    }, [data, level, margin, size])

    return (
        <div
            style={{ width: size, height: size }}
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    )
}
