import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-4">About Page</h1>
      <Link to="/" className="text-blue-500 underline">Back to Home</Link>
    </div>
  );
}
