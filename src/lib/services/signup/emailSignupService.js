export default async function emailSignupService(email, password, supabaseClient) {
	const {user, error} = await supabaseClient.auth.signUp({
		email: email,
		password: password
	});

	if (error) {
        console.error("Failed to request Signup auth! " + error.message)
        return false;
    }

    return true;
}