export default function LoginPage() {
  const googleURL = `${import.meta.env.VITE_API_URL}/auth/google`;

  return (
    <div>
      <h1>Welcome</h1>
      <p>Left of where you started!</p>
      <a href={googleURL}>Continue with google</a>
    </div>
  );
}
