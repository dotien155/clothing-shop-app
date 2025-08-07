import Login from "./Login";
import Register from "./Register";


function Index() {
    return (
        <div className="container">
            <div className="row">
                {/* Login Form */}               
                    <Login />

                {/* OR */}
                <div className="col-sm-1">
                    <h2 className="or">OR</h2>
                </div>

                {/* Register Form */}
                    <Register />
            </div>
        </div>
    );
}

export default Index;
