import PropTypes from 'prop-types';
import React, { useRef } from 'react';
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

const Button = styled.button(() => ({
  position: 'absolute',
  bottom: 0,
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

const UserInfo = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  backgroundColor: '#f9f9f9',
}));

const UserInitials = styled.div(() => ({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: '#333',  // Darkened background color
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#fff',
  marginRight: '10px',
}));

const UserName = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const UserNameText = styled.div(() => ({
  fontWeight: 'bold',
  fontSize: '16px',
}));

const UserEmail = styled.div(() => ({
  fontSize: '14px',
  color: '#666',
}));

const Post = ({ post }) => {
  const carouselRef = useRef(null);

  const handleNextClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 50,
        behavior: 'smooth',
      });
    }
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -70,
        behavior: 'smooth',
      });
    }
  };

  return (
    <PostContainer>
      <UserInfo>
        <UserInitials>{post.user.initials}</UserInitials>
        <UserName>
          <UserNameText>{post.user.name}</UserNameText>
          <UserEmail>{post.user.email}</UserEmail>
        </UserName>
      </UserInfo>
      <CarouselContainer>
        <Carousel ref={carouselRef}>
          {post.images.map((image, index) => (
            <CarouselItem key={index}>
              <Image src={image.url} alt={post.title} />
            </CarouselItem>
          ))}
        </Carousel>
        <PrevButton onClick={handlePrevClick}>&#10094;</PrevButton>
        <NextButton onClick={handleNextClick}>&#10095;</NextButton>
      </CarouselContainer>
      <Content>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </Content>
    </PostContainer>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string,
    })),
    user: PropTypes.shape({
      initials: PropTypes.string,
      name: PropTypes.string,
      email: PropTypes.string,
    }),
  }).isRequired,
};

export default Post;
