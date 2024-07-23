import { Box, Container, Typography ,Stack, Button} from '@mui/material';
import React from 'react';
import book from '../../assets/img/book.png'
const Home1 = () => {
  return (
    <Box
      sx={{
        // backgroundImage:
        //   "url('https://img.pikbest.com/wp/202348/bookstore-books-virtual-3d-illustration-of-online-shopping-for-on-a-smartphone_9778006.jpg!sw800')",
        //  backgroundPosition:"center",
        //  backgroundSize:'cover',
        //  backgroundRepeat:"no-repeat",
        // width: "100%",
        // height: "100vh",
      }}
    >
      <Container>
        <Stack
          direction={{ xs: "column-reverse", sm: "column-reverse" ,md:"row"}}
          // alignItems="center"
          sx={{
            mt: 10,
            width: "100%",
            mx:{xs:2,sm:0,md:2}
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", sm: "100%" ,md:"50%"},
              mt: 5,
            }}
          >
            <Typography variant="h6" color="primary" sx={{
              fontSize:{xs:"2.5rem",sm:"3rem",md:"3.75rem"},
              fontFamily:'robato',
              fontWeight:600
            }}>
              Learn Everyday
            </Typography>
            <Typography
              variant="body1"
              color="primary"
              component={Box}
              sx={{
                width: { xs: "100%", sm: "100%",md:"80%" },
                fontFamily:"robato",
                lineHeight:2,
                py:2,
                fontSize:"1rem"
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
            <Button variant='contained' sx={{
              px:10,
              py:1.5,
              mt:2
            }}>
              Read More
            </Button>
          </Box>
          <Box
            sx={{
              width: { xs: "100%", sm: "50%" },
              height: { xs: "100%", sm: "500" },
            }}
          >
            <Box
              sx={{
                width: { xs: "250px", sm: "500px" },
                height: { xs: "250px", sm: "500px" },
              }}
            >
              <img
                src={book}
                alt="img"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                }}
              />
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default Home1;
