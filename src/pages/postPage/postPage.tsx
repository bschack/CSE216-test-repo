import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CommentCard } from "../../libs/components/commentCard/commentCard";
import { CommentForm } from "../../libs/components/commentForm/commentForm";
import { Header } from "../../libs/components/header/header";
import { LoadingCard } from "../../libs/components/loadingCard/loadingCard";
import { PostCard } from "../../libs/components/postCard/postCard";
import { commentProps, postProps } from "../../libs/constants/types";
import { Section } from "../../libs/content/section/section";
import { getPost } from "../../libs/api/getPost";

const PostPage = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [qed, setQed] = useState<boolean>(false);
  const [data, setData] = useState<any>();

  const params = useParams();
  const targetPid = parseInt(params.pid || "-1");
  const post: postProps = data?.post;
  const comments: commentProps[] = data?.comments!;

  const loadPost = useCallback(async () => {
    await getPost(targetPid)
      .then((data) => {
        if (data) {
          setData(data);
          setLoaded(true);
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  }, [targetPid]);

  useEffect(() => {
    document.title = `Comments | BLEND`;

    if (!qed) {
      loadPost();
      setQed(true);
    }

    const renew = setInterval(async () => await loadPost(), 8000);
    return () => clearInterval(renew);
  }, [loadPost, post, qed]);

  return (
    <Section space>
      <Header />
      {loaded ? (
        <Section>
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
            updated={false}
            postPage
          />
          <CommentForm postId={targetPid} />
          <Section posts>
            {comments
              .sort((c1, c2) => (c1.commentId > c2.commentId ? -1 : 1))
              .map((comment) => {
                return (
                  <CommentCard key={comment.commentId} comment={comment} />
                );
              })}
          </Section>
        </Section>
      ) : (
        <LoadingCard />
      )}
    </Section>
  );
};

export default PostPage;
