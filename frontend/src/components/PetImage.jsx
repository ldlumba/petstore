import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import { useState } from 'react';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80';

export default function PetImage({ alt, imageUrl, height = 220, sx = {} }) {
  const [src, setSrc] = useState(imageUrl || FALLBACK_IMAGE);

  return (
    <Box sx={{ height, overflow: 'hidden', bgcolor: 'grey.100', ...sx }}>
      <CardMedia
        component="img"
        image={src}
        alt={alt}
        onError={() => setSrc(FALLBACK_IMAGE)}
        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </Box>
  );
}
