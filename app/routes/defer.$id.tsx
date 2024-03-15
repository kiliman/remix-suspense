import { type LoaderFunctionArgs, defer } from "@remix-run/node";
import {
  Await,
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from "@remix-run/react";
import { Suspense } from "react";

export async function loader({ params }: LoaderFunctionArgs) {
  return defer({
    data: new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
      return { message: `This is slow data for id ${params.id}` };
    }),
  });
}

export default function Component() {
  const { data } = useLoaderData<typeof loader>();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <select
          value={id}
          onChange={(e) => navigate(`/defer/${e.target.value}`)}
        >
          <option value={123}>123</option>
          <option value={456}>456</option>
          <option value={789}>789</option>
        </select>
      </div>
      <Suspense key={location.pathname} fallback="Loading...">
        <Await resolve={data} errorElement={<p>Error loading slow data!</p>}>
          {(data) => <pre>{JSON.stringify(data, null, 2)}</pre>}
        </Await>
      </Suspense>
    </div>
  );
}
