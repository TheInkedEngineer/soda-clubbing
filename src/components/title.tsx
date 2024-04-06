import React from 'react';

interface TitleProps {
    text: string;
}

const Title: React.FC<TitleProps> = ({ text }) => {
    return (
        <h1 className="text-3xl font-bold mt-8 mb-8 title">
            {text}
        </h1>
    );
}

export default Title;