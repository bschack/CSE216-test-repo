import { useCallback, useEffect, useState } from "react";
import { PostCard } from "../../libs/components/postCard/postCard";
import { PostForm } from "../../libs/components/postForm/postForm";
import { postProps } from "../../libs/constants/types";
import { Section } from "../../libs/content/section/section";
import { getAllPosts } from "../../libs/hooks/getAllPosts";
import { homepageProps } from "./homepage.types";
import { LoadingCard } from "../../libs/components/loadingCard/loadingCard";
import { Header } from "../../libs/components/header/header";

import styles from "./homepage.module.scss";

const Homepage = ({ alerts }: homepageProps) => {
  const [postData, setPostData] = useState<any>();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [dataLength, setDataLength] = useState<number>(0);
  const [updated, setUpdated] = useState<boolean>(false);
  const [displayed, setDisplayed] = useState<number>(15);

  const posts: postProps[] = postData?.Data;

  const totalPostLength: number = postData?.Data.length;
  const newPostLength = totalPostLength - dataLength;
  const newPost = newPostLength > 0;
  const canDisplayPosts = dataLength > 0 && posts;
  const canDisplayNew = newPost && canDisplayPosts;
  const numberShown = Math.min(displayed, dataLength);

  const loadMore = () => {
    setDisplayed(displayed + 20);
  };

  const updatePosts = useCallback(() => {
    setDataLength(totalPostLength);
  }, [totalPostLength]);

  const getPosts = useCallback(async () => {
    setUpdated(false);
    await getAllPosts().then((data) => {
      if (data) {
        setPostData(data);
        if (!loaded && totalPostLength > 0) {
          updatePosts();
          setLoaded(true);
        }
        setUpdated(true);
      }
    });
  }, [loaded, totalPostLength, updatePosts]);

  useEffect(() => {
    const renew = setInterval(async () => await getPosts(), 8000);
    return () => clearInterval(renew);
  });

  useEffect(() => {
    if (!loaded) {
      getPosts();
    }
    if (canDisplayNew) {
      document.title = `(${newPostLength}) Home | BLEND`;
    } else {
      document.title = `Home | BLEND`;
    }
  }, [canDisplayNew, getPosts, loaded, newPostLength]);

  return (
    <Section space>
      <Header />
      <Section>
        <PostForm alerts={alerts} disabled={!canDisplayPosts} />
      </Section>
      <Section posts>
        {canDisplayNew ? (
          <Section>
            <div
              className={styles["homepage__new-posts"]}
              onClick={updatePosts}
            >
              Show {newPostLength} {newPostLength === 1 ? "Post" : "Posts"}
            </div>
          </Section>
        ) : null}
        {canDisplayPosts ? (
          <>
            {posts
              .sort((p1, p2) => (p1.postId > p2.postId ? -1 : 1))
              .slice(newPostLength, newPostLength + numberShown)
              .map((post: postProps) => (
                <PostCard
                  key={post.postId}
                  id={post.postId}
                  message={post.content}
                  likes={post.likes}
                  dislikes={post.dislikes}
                  comments={post.comments}
                  date={post.date}
                  userId={post.userId}
                  username={post.username}
                  vote={post.vote}
                  updated={updated}
                />
              ))}
            {numberShown !== dataLength ? (
              <Section>
                <div
                  className={styles["homepage__new-posts"]}
                  onClick={loadMore}
                >
                  Load Older Posts
                </div>
              </Section>
            ) : null}
          </>
        ) : (
          <>
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </>
        )}
      </Section>
    </Section>
  );
};

export default Homepage;
