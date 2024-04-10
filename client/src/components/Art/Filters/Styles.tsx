import React, { useState, useEffect } from 'react';

export default function Styles() {
    const styles = ["Style 1", "Style 2", "Style 3"];
    const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const existingStyles = urlSearchParams.getAll('style');
    
        existingStyles.forEach(existingStyle => {
            urlSearchParams.delete('style');
        });
    
        // Append selected styles
        selectedStyles.forEach(selectedStyle => {
            urlSearchParams.append('style', selectedStyle);
        });
    
        const queryString = urlSearchParams.toString();
        const url = `${window.location.pathname}?${queryString}`;
    
        window.history.pushState({}, '', url);
    }, [selectedStyles]);
    

    const handleStyleChange = (style: string) => {
        if (!selectedStyles.includes(style)) {
            setSelectedStyles([...selectedStyles, style]);
        } else {
            setSelectedStyles(selectedStyles.filter((s) => s !== style));
        }
    };

    return (
        <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2 ">Style</h3>
            {styles.map((style, index) => (
                <div key={index} className='p-2'>
                    <input
                        type="checkbox"
                        id={`style-${index}`}
                        className="mr-2 rounded border border-zinc-900 accent-zinc-900 w-4 h-4 text-zinc-900 focus:outline-none focus:border-indigo-500"

                        value={style}
                        checked={selectedStyles.includes(style)}
                        onChange={() => handleStyleChange(style)}
                    />
                    <label htmlFor={`style-${index}`}>{style}</label>
                </div>
            ))}
        </div>
    );
}
