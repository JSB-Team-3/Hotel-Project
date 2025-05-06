import { Grid, Box, Typography, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Visibility from '@mui/icons-material/Visibility';
import nodata from '../../assets/images/noimg.jpg';
import { RoomCardProps } from '../../Interfaces/props.interface';
import { Link } from 'react-router-dom';
export default function RoomCard({room ,handleFav}:RoomCardProps) {
  return (
      <Grid size={{ xs: 12, md: 4, lg: 3 }}>
        <Box
          sx={{
            direction:"ltr",
            position: 'relative',
            width: '100%',
            // height: '215px',
            borderRadius: '15px',
            overflow: 'hidden',
            '&:hover .hover-overlay': {
              opacity: 1,
              transform: 'translateY(0)',
            },
            '&:hover .hover-img': {
              transform: 'scale(1.2)',
            },
          }}
        >
            {/* overLay */}
            <Box 
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 1,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%)'
            }}
          ></Box>
          {/* Image */}
          <Box 
            component="img" 
            className='hover-img'
            src={room?.images?.[0] || nodata} 
            sx={{
              width: '100%',
              height: '215px',
              borderRadius: '15px', 
              objectFit: 'cover',
              transform:'scale(1.1)',
              transition:'transform 0.8s ease',
            }}
          />
          <Box sx={{position: 'absolute',
           top: 0,
            right: 0,
            width: '180px',
            height: '40px', 
            borderEndStartRadius: '15px',
            backgroundColor: '#FF498B',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',}}>
            <Typography variant='body1' sx={{color:'white',}}>
                <Box component="span" sx={{fontWeight:'bold',mr:1}}>
                ${room?.price}
                </Box>
                <Box component="span" sx={{fontWeight:'bold'}}>
                per night
                </Box>
            </Typography>
          </Box>
          {/* Hover icons */}
          <Box 
            className="hover-overlay"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 1,
              backgroundColor: 'rgba(32, 63, 199, 0.21)',
              opacity: 0,
              transform: 'translateY(20%)',
              transition: 'opacity 0.3s ease , transform 0.3s ease',
            }}
          >
            <IconButton 
            onClick={() => handleFav && handleFav(room._id)}
              aria-label="add to favorites"
              sx={{ 
                color: 'white',
                '&:hover': { 
                  color: 'red',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)'
                }
              }}
            >
              <FavoriteIcon />
            </IconButton>
            <IconButton
            component={Link}
            to={`/rooms/${room._id}`} 
              aria-label="show details"
              sx={{ 
                color: 'white',
                '&:hover': { 
                  color: 'blue',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)'
                }
              }}
            >
              <Visibility />
            </IconButton>
          </Box>
          
          {/* Text at bottom left */}
          <Typography
            variant="body1"
            sx={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              color: 'white',
              fontWeight: 'bold',
              textShadow: '1px 1px 3px rgba(0,0,0,0.7)'
            }}
          >
            {room?.roomNumber}
          </Typography>
        </Box>
      </Grid>
  );
}