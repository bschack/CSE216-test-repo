import { render, screen } from "@testing-library/react";
import { StatsBar } from "./statsBar";
import { formatNumber } from "../../utils/formatter";
import { faker } from "@faker-js/faker";
import "@testing-library/jest-dom";
import { statsBarProps } from "./statsBar.types";

const post: statsBarProps = {
  type: "post",
  id: 1,
  likes: faker.datatype.number({ min: 1_000_000 }),
  liked: faker.datatype.boolean(),
  dislikes: faker.datatype.number({ min: 1_000, max: 999_999 }),
  disliked: faker.datatype.boolean(),
  comments: faker.datatype.number({ min: 0, max: 999 }),
  commented: faker.datatype.boolean()
};
describe("Stats Bar Numbers", () => {
  render(
    <StatsBar
      type={post.type}
      id={post.id}
      likes={post.likes}
      liked={post.liked}
      dislikes={post.dislikes}
      disliked={post.disliked}
      comments={post.comments}
      commented={post.commented}
    />
  );

  it("should display formatted numbers", () => {
    const passLikes = screen.getAllByText(formatNumber(post.likes));
    const passDislikes = screen.getAllByText(formatNumber(post.dislikes));
    const passComments = screen.getAllByText(formatNumber(post.comments));
    expect(passLikes).toHaveLength(1);
    expect(passDislikes).toHaveLength(1);
    expect(passComments).toHaveLength(1);
  });
});
