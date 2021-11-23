import React from "react";
import getYouTubeID from "get-youtube-id";

const YouTubePreview = ({ value }) => {
  const { url, text, position, heading } = value;
  const id = getYouTubeID(url);
  const embedUrl = `https://www.youtube.com/embed/${id}`;
  if(!id) {
    return <div>Missing YouTube URL</div>;
  }
  return (
    <div>
      <h5 style={{ 'margin': '1rem' }}>{heading}</h5>
      <div style={{ 'margin': '0.5rem 1rem 1rem 1rem' }}>
        <iframe
          style={{
            'display': 'block',
            'float': `${position.toLowerCase() === 'left' ? 'left' : 'right'}`,
            'padding': `${position.toLowerCase() === 'left' ? '0 1rem 0 0' : '0 0 0 1rem'}`,
            'max-width': '100%'
          }}
          height="200"
          src={embedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        <p style={{ 'marginTop': '0' }}>{text}</p>
      </div>
    </div>
  );
};

export default {
  title: "YouTube embed",
  name: "youtubeEmbed",
  type: "object",
  fields: [
    {
      title: "YouTube video URL",
      name: "url",
      type: "url",
    },
    {
      title: 'Video position',
      name: 'position',
      type: 'string',
      options: {
        list: ['Left', 'Right'],
        layout: 'radio',
        direction: 'horizontal'
      }
    },
    {
      title: 'Video heading',
      name: 'heading',
      type: 'string',
    },
    {
      title: 'Side text',
      name: 'text',
      type: 'text',
    },
  ],
  preview: {
    select: {
      url: 'url',
      text: 'text',
      position: 'position',
      heading: 'heading'
    },
    component: YouTubePreview,
  },
};