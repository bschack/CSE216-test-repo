import { render, screen } from "@testing-library/react";
import { StatsBar } from "./statsBar";
import { formatNumber } from "../../utils/formatter";
import { faker } from "@faker-js/faker";
import "@testing-library/jest-dom";
import { statsBarProps } from "./statsBar.types";

const post: statsBarProps = {
  postPage: faker.datatype.boolean(),
  id: 1,
  userId: 1,
  likes: faker.datatype.number({ min: 1_000_000 }),
  dislikes: faker.datatype.number({ min: 1_000, max: 999_999 }),
  comments: faker.datatype.number({ min: 0, max: 999 }),
  updated: false
};
describe("Stats Bar Numbers", () => {
  render(
    <StatsBar
      postPage={post.postPage}
      id={post.id}
      userId={post.userId}
      likes={post.likes}
      dislikes={post.dislikes}
      comments={post.comments}
      updated={post.updated}
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
