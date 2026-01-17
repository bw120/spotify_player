import { LibraryProvider } from "./LibraryContext";
import TopPlaylists from "./UserPlayLists";

const Library = () => (
  <LibraryProvider>
    {({  } = {}) => {
      return (
        <>
          <div>Library Component</div>
          <TopPlaylists />
        </>
      );
    }}
  </LibraryProvider>
);

export default Library;