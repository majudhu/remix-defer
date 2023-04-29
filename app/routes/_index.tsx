import { defer } from "@remix-run/node";
import { useLoaderData, Await, Link } from "@remix-run/react";
import { Suspense } from "react";

export async function loader() {
  const zero_second = await new Promise((r) => r("zero second"));
  const one_second = new Promise((r) =>
    setTimeout(() => r("one second"), 1000)
  );
  const two_second = new Promise((r) =>
    setTimeout(() => r("two second"), 2000)
  );
  const three_second = new Promise((r) =>
    setTimeout(() => r("three second"), 3000)
  );
  const four_second = new Promise((r) =>
    setTimeout(() => r("four second"), 4000)
  );
  const five_second = new Promise((r) =>
    setTimeout(() => r("five second"), 5000)
  );
  return defer({
    zero_second,
    one_second,
    two_second,
    three_second,
    four_second,
    five_second,
  });
}

export default function Index() {
  const {
    zero_second,
    one_second,
    two_second,
    three_second,
    four_second,
    five_second,
  } = useLoaderData<typeof loader>();
  return (
    <div>
      <Link to="/">/</Link>
      <p>{zero_second}xx</p>
      <Suspense>
        <Await resolve={one_second}>{(data) => <p>{data}</p>}</Await>
      </Suspense>
      <Suspense>
        <Await resolve={two_second}>{(data) => <p>{data}</p>}</Await>
      </Suspense>
      <Suspense>
        <Await resolve={three_second}>{(data) => <p>{data}</p>}</Await>
      </Suspense>
      <Suspense>
        <Await resolve={four_second}>{(data) => <p>{data}</p>}</Await>
      </Suspense>
      {/* <Suspense>
        <Await resolve={five_second}>{(data) => <p>{data}</p>}</Await>
      </Suspense> */}
    </div>
  );
}
