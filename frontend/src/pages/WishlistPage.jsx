import { Box, Button, Card, CardContent, Chip, Container, Grid, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useShopping } from '../components/AppProviders';
import PetImage from '../components/PetImage';

export default function WishlistPage() {
  const navigate = useNavigate();
  const { wishlistItems, removeFromWishlist, addToCart } = useShopping();

  if (wishlistItems.length === 0) {
    return (
      <Container sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>Your wishlist is empty</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Save your favorite pets to your wishlist!
          </Typography>
          <Button variant="contained" onClick={() => navigate('/')}>
            Back to Catalog
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>My Wishlist</Typography>
      
      <Grid container spacing={3}>
        {wishlistItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <PetImage imageUrl={item.imageUrl} alt={item.name} height={200} />
              <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                  <Chip size="small" label={item.category} color="primary" />
                  <Chip size="small" label={item.availability} color={item.availability === 'AVAILABLE' ? 'success' : 'default'} />
                </Box>
                <Typography variant="h6" sx={{ mb: 1 }}>{item.name}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flex: 1 }}>
                  {item.description}
                </Typography>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  ${item.price}
                </Typography>
                <Stack spacing={1}>
                  <Button
                    variant="contained"
                    fullWidth
                    disabled={item.availability !== 'AVAILABLE'}
                    onClick={() => {
                      addToCart(item);
                      removeFromWishlist(item.id);
                    }}
                  >
                    Move to Cart
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    fullWidth
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    Remove
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
