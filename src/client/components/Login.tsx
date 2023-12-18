export default function Login({ onLogin }: { onLogin: (username: string, password: string) => void }) {
  return (
    <form style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }} onSubmit={(e) => {
        e.preventDefault();
        const username = e.currentTarget.username.value;
        const password = e.currentTarget.password.value;
        console.log({username, password});
        onLogin(username, password);
    }}>
        <h2>Login</h2>
        <h3>Username</h3>
        <input type="text" name="username" />
        <h3>Password</h3>
        <input type="password" name="password" placeholder='Password'/>
        <button type="submit" >Login</button>
    </form>
  );
}
