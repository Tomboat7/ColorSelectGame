
import React, { useState, useEffect, useMemo } from 'react';
import { hexToRgb, rgbToHex } from '../utils/colorUtils';
import { RGBColor } from '../types';

interface ColorInputProps {
  value: string;
  onChange: (color: string) => void;
}

const ColorInput: React.FC<ColorInputProps> = ({ value, onChange }) => {
  const [hex, setHex] = useState(value);
  const [rgb, setRgb] = useState<RGBColor>({ r: 0, g: 0, b: 0 });

  const isValidHex = useMemo(() => /^#[0-9A-F]{6}$/i.test(hex), [hex]);

  useEffect(() => {
    setHex(value);
    const newRgb = hexToRgb(value);
    if (newRgb) {
      setRgb(newRgb);
    }
  }, [value]);

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;
    if (!input.startsWith('#')) {
        input = '#' + input;
    }
    setHex(input);
    const newRgb = hexToRgb(input);
    if (newRgb) {
      setRgb(newRgb);
      onChange(input);
    }
  };

  const handleRgbChange = (channel: keyof RGBColor, val: string) => {
    const numValue = parseInt(val, 10);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 255) {
      const newRgb = { ...rgb, [channel]: numValue };
      setRgb(newRgb);
      const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
      setHex(newHex);
      onChange(newHex);
    } else if (val === '') {
        const newRgb = { ...rgb, [channel]: 0 };
        setRgb(newRgb);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-gray-700 rounded-xl">
      <div className="w-40 h-40 rounded-full shadow-lg border-4 border-gray-800" style={{ backgroundColor: isValidHex ? hex : '#000' }}></div>
      <div className="flex flex-col gap-3 font-mono w-full">
        <div className="flex items-center gap-2">
            <label htmlFor="hex" className="text-lg font-bold text-gray-300">HEX</label>
            <input
                id="hex"
                type="text"
                value={hex}
                onChange={handleHexChange}
                className={`w-full p-2 rounded bg-gray-800 text-white border-2 ${isValidHex ? 'border-gray-600' : 'border-red-500'} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                maxLength={7}
            />
        </div>
        <div className="flex items-center gap-2">
            <label htmlFor="r" className="w-4 text-lg font-bold text-red-400">R</label>
            <input id="r" type="number" min="0" max="255" value={rgb.r} onChange={(e) => handleRgbChange('r', e.target.value)} className="w-full p-2 rounded bg-gray-800 text-white border-2 border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500" />
        </div>
        <div className="flex items-center gap-2">
            <label htmlFor="g" className="w-4 text-lg font-bold text-green-400">G</label>
            <input id="g" type="number" min="0" max="255" value={rgb.g} onChange={(e) => handleRgbChange('g', e.target.value)} className="w-full p-2 rounded bg-gray-800 text-white border-2 border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500" />
        </div>
        <div className="flex items-center gap-2">
            <label htmlFor="b" className="w-4 text-lg font-bold text-blue-400">B</label>
            <input id="b" type="number" min="0" max="255" value={rgb.b} onChange={(e) => handleRgbChange('b', e.target.value)} className="w-full p-2 rounded bg-gray-800 text-white border-2 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>
    </div>
  );
};

export default ColorInput;
