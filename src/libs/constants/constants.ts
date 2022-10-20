export const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export const BACKEND_URL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_LOCAL_BACKEND_URL
    : process.env.REACT_APP_BACKEND_URL;

type postCardProps = {
  id: number;
  message: string;
  likes: number;
  username?: string;
  title?: string;
  date?: Date;
};

type userProps = {
  userId: number;
  username: string;
  postLikes: number[];
  postDislikes: number[];
  commentLikes: number[];
  commentDislikes: number[];
};

export type alertProps = {
  type: "Error" | "Warning" | "Success";
  content: string;
};

export const postFailedAlert: alertProps = {
  type: "Error",
  content: "Something went wrong when submitting your post!"
};

export const postSuccessAlert: alertProps = {
  type: "Success",
  content: "Your message was posted!"
};

export const loginSuccessAlert: alertProps = {
  type: "Success",
  content: "You have been logged in!"
};

export const loginFailedAlert: alertProps = {
  type: "Error",
  content: "There was a problem logging you in..."
};

export const userDNE: alertProps = {
  type: "Error",
  content: "This user does not exist."
};

export const testUsers: userProps = {
  userId: 1,
  username: "Test User",
  postLikes: [1, 2, 3],
  postDislikes: [],
  commentLikes: [],
  commentDislikes: []
};

export const testPost: postCardProps[] = [
  {
    id: 1,
    message: "Hello, world",
    likes: 100,
    date: new Date()
  },
  {
    id: 2,
    message:
      "Testing longer messages for growing aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    likes: 2,
    date: new Date()
  },
  {
    id: 3,
    message: "Lets go",
    likes: 50,
    date: new Date()
  },
  {
    id: 4,
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A pellentesque sit amet porttitor eget dolor morbi non. Adipiscing elit ut aliquam purus sit amet luctus venenatis. Sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula. Blandit cursus risus at ultrices mi tempus imperdiet nulla malesuada. Commodo elit at imperdiet dui accumsan sit. Quis varius quam quisque id. Eu ultrices vitae auctor eu augue ut lectus arcu bibendum. Nisl rhoncus mattis rhoncus urna neque viverra justo. Nisi vitae suscipit tellus mauris a diam maecenas sed enim. Ut sem viverra aliquet eget sit. Urna cursus eget nunc scelerisque viverra mauris. Est ante in nibh mauris cursus mattis molestie. Sagittis nisl rhoncus mattis rhoncus urna. Maecenas volutpat blandit aliquam etiam erat velit. Donec ac odio tempor orci dapibus. Suscipit tellus mauris a diam.",
    likes: 50500,
    date: new Date()
  },
  {
    id: 5,
    message:
      "Massa ultricies mi quis hendrerit dolor magna. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend. Sed id semper risus in hendrerit gravida rutrum quisque. Suspendisse potenti nullam ac tortor vitae purus faucibus ornare. Feugiat vivamus at augue eget arcu dictum varius duis at. Aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Adipiscing bibendum est ultricies integer. Dictum varius duis at consectetur lorem donec massa. Neque egestas congue quisque egestas. Integer enim neque volutpat ac tincidunt. Vitae proin sagittis nisl rhoncus mattis. Tristique magna sit amet purus gravida quis blandit turpis cursus. Volutpat est velit egestas dui id ornare. Nunc sed id semper risus in. Ultrices vitae auctor eu augue ut lectus arcu bibendum. Ornare lectus sit amet est.",
    likes: 50
  },
  {
    id: 6,
    message:
      "In fermentum posuere urna nec tincidunt praesent. Viverra nam libero justo laoreet sit amet cursus sit amet. Augue lacus viverra vitae congue eu consequat ac felis. Mattis nunc sed blandit libero volutpat sed cras ornare. Hendrerit gravida rutrum quisque non tellus orci ac. Mus mauris vitae ultricies leo integer malesuada. Rutrum quisque non tellus orci ac auctor augue. Sem et tortor consequat id porta nibh venenatis cras. At urna condimentum mattis pellentesque id nibh. Sagittis eu volutpat odio facilisis mauris sit amet. Enim sit amet venenatis urna cursus eget nunc scelerisque. Purus ut faucibus pulvinar elementum integer enim neque volutpat.",
    likes: 50,
    date: new Date()
  }
];
