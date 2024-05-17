import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';

const PostContainer = styled.div(() => ({
  width: '300px',
  margin: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  overflow: 'hidden',
}));

const CarouselContainer = styled.div(() => ({
  position: 'relative',
}));

const Carousel = styled.div(() => ({
  display: 'flex',
  overflowX: 'scroll',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  position: 'relative',
}));

const CarouselItem = styled.div(() => ({
  flex: '0 0 auto',
  scrollSnapAlign: 'start',
}));

const Image = styled.img(() => ({
  width: '280px',
  height: 'auto',
  maxHeight: '300px',
  padding: '10px',
}));

const Content = styled.div(() => ({
  padding: '10px',
  '& > h2': {
    marginBottom: '16px',
  },
}));

const HorizontalContent = styled.div(() => ({
  padding: '10px',
  '& > h2': {
    marginBottom: '16px',
  },
  display: 'flex',
  gap: 12,
}));

const Button = styled.button(() => ({
  position: 'absolute',
  bottom: 'calc(50% - 25px)',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: 'none',
  color: '#000',
  fontSize: '20px',
  cursor: 'pointer',
  height: '50px',
}));

const PrevButton = styled(Button)`
  left: 10px;
`;

const NextButton = styled(Button)`
  right: 10px;
`;

const Caption = styled.span(() => ({
  fontSize: 12,
  fontWeight: 500,
}));

const Avatar = styled.div(() => ({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: '#ccc',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#fff',
  textTransform: 'uppercase',
}));

const Post = ({ post }) => {
  const [scrolling, setScrolling] = useState(false);
  const carouselRef = useRef(null);

  // Handle the event when the next button is clicked
  const handleNextButtonClick = () => {
    try {
      if (scrolling) return;
      const carousel = carouselRef.current;
      const carouselWidth = carousel.offsetWidth;

      if (carousel) {
        setScrolling(true);

        // If reached the end, scroll to the beginning
        if (carousel.scrollLeft + carouselWidth >= carousel.scrollWidth) {
          carousel.scrollLeft = 0;
          setTimeout(() => setScrolling(false), 0);
        } else {
          carousel.scrollBy({
            left: carouselWidth,
            behavior: 'smooth',
          });
          setTimeout(() => setScrolling(false), 500);
        }
      }
    } catch (error) {
      console.error('Error in handleNextButtonClick: ', error);
    }
  };

  // Handle the event when the previous button is clicked
  const handlePrevButtonClick = () => {
    try {
      const carousel = carouselRef.current;
      const carouselWidth = carousel.offsetWidth;

      if (carousel) {
        setScrolling(true);

        // If at the beginning, scroll to the end
        if (carousel.scrollLeft === 0) {
          carousel.scrollLeft = carousel.scrollWidth;
          setTimeout(() => setScrolling(false), 0);
        } else {
          carousel.scrollBy({
            left: -carouselWidth,
            behavior: 'auto',
          });
          setTimeout(() => setScrolling(false), 500);
        }
      }
    } catch (error) {
      console.error('Error in handlePrevButtonClick: ', error);
    }
  };

  // Get initials from the user name
  const getInitials = name => {
    const names = name.split(' ');
    let initials = '';
    names.forEach(n => {
      initials += n.charAt(0);
    });
    return initials;
  };

  // Render carousel items
  const renderCarouselItems = () => {
    return post.images.map((image, index) => (
      <CarouselItem key={index}>
        <Image src={image.url} alt={post.title} />
      </CarouselItem>
    ));
  };

  return (
    <PostContainer>
      <HorizontalContent>
        <Avatar>{getInitials(post.userName)}</Avatar>
        <div>
          <h4>{post.userName}</h4>
          <Caption>{post.userEmail}</Caption>
        </div>
      </HorizontalContent>

      <CarouselContainer>
        <Carousel ref={carouselRef}>{renderCarouselItems()}</Carousel>
        <PrevButton onClick={handlePrevButtonClick}>&#10094;</PrevButton>
        <NextButton onClick={handleNextButtonClick}>&#10095;</NextButton>
      </CarouselContainer>

      <Content>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </Content>
    </PostContainer>
  );
};

// Prop types for Post component
Post.propTypes = {
  post: PropTypes.shape({
    content: PropTypes.any,
    images: PropTypes.shape({
      map: PropTypes.func,
    }),
    title: PropTypes.any,
  }),
};

export default Post;
