import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';
import { fetchPosts } from '../../server/posts/posts.service';
import { WindowWidthContext } from '../contexts/WindowWidthContext';

const PostListContainer = styled.div(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

const LoadMoreButton = styled.button(() => ({
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
  fontSize: 16,
  marginTop: 20,
  transition: 'background-color 0.3s ease',
  fontWeight: 600,

  '&:hover': {
    backgroundColor: '#0056b3',
  },
  '&:disabled': {
    backgroundColor: '#808080',
    cursor: 'default',
  },
}));

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isSmallerDevice } = useContext(WindowWidthContext);

  let start = 0;
  const limit = isSmallerDevice ? 5 : 10;

  // Reread posts when posts are updated
  useEffect(() => {}, [posts]);

  // Fetch initial posts
  useEffect(async () => {
    const fetchInitialPosts = async () => {
      const posts = await fetchPosts({ start, limit });
      console.log(posts);
      setPosts(posts);
    };

    await fetchInitialPosts();
  }, [isSmallerDevice]);

  const handleClick = async () => {
    setIsLoading(true);

    // Fetch more posts and append them to the existing posts
    const morePosts = await fetchPosts({ start, limit });
    setPosts(prevPosts => [...prevPosts, ...morePosts]);

    setIsLoading(false);
  };

  return (
    <Container>
      <PostListContainer>
        {posts.length !== 0 ? (
          posts.map(post => <Post post={post} />)
        ) : (
          <span style={{ marginTop: 24 }}>Loading posts...</span>
        )}
      </PostListContainer>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {posts.length !== 0 && (
          <LoadMoreButton onClick={handleClick} disabled={isLoading}>
            {!isLoading ? 'Load More' : 'Loading...'}
          </LoadMoreButton>
        )}
      </div>
    </Container>
  );
}
