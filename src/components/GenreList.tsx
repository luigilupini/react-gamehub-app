import {
  Button,
  HStack,
  Image,
  List,
  ListItem,
  Spinner,
} from '@chakra-ui/react';
import useGenres, { Genre } from '../hooks/useGenres';

import imageCropper from '../services/image-crop';

interface Props {
  setSelectGenre: (genre: Genre) => void;
  selectGenreId?: number | null;
}

export default function GenreList({ selectGenreId, setSelectGenre }: Props) {
  const { data, isLoading, error } = useGenres();
  if (error) return null;
  if (isLoading) return <Spinner />;
  return (
    <List>
      {data?.results.map((genre) => (
        <ListItem key={genre.id} paddingY="5px">
          <HStack gap={1}>
            <Image
              width="30px"
              height="30px"
              objectFit="cover"
              borderRadius="full"
              src={imageCropper(genre.image_background)}
            />
            <Button
              fontWeight={`${selectGenreId === genre.id ? 'bold' : 'normal'}`}
              fontSize="14px"
              variant="link"
              whiteSpace="normal"
              textAlign="left"
              onClick={() => {
                setSelectGenre(genre);
              }}
            >
              {genre.name === 'Massively Multiplayer'
                ? 'Multiplayer'
                : genre.name}
            </Button>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
}

/* Typical Approuch to data fetching problems 🤬 (#1)

- No request cacellation when the component unmounts (cleanup)
- No separation of concerns as our querying logic is leaked into our component
- No retries on failed requests
- No auto refreshing "refetching" so we remain in stale view
- No caching so we are fetching the same data over and over again

```jsx
const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/todos')
      .then((res) => setTodos(res.data))
      .catch((error) => setError(error));
  }, []);

  if (error) return <p>{error}</p>;
  return (...
  );
};
```

Solution: React Query

A powerful library that helps us with data fetching and caching in React Apps. A
sound replacement for "async" Redux that is used for fetching and catching data.
The result is less boilerplate & learning is much lower than Redux. React Query 
reduces the amount of code we have to introduce, write, debug and maintain.

> Redux is no longer needed (at least for caching) */
