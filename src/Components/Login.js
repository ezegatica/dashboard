import React, {useState, useContext} from 'react'
import { Form, Button, Container, Card } from "react-bootstrap";
import axios from 'axios'
import AuthContext from '../Context/AuthContext';
import { useHistory } from 'react-router';

function LoginComponent() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const {getLoggedIn} = useContext(AuthContext)
    const history = useHistory();


    async function submit(e){
        e.preventDefault()
        console.log("ESTADO:", username, password);
        try {
            const loginData = {
                username, password
            }
        await axios.post("http://localhost:5000/auth/login", loginData, {
            withCredentials: true
        });
        await getLoggedIn()
        history.push("/")


        } catch (err) {
            console.error(err);
        }
    }
    return (
        <Container>
            <Card className="p-5 ">
                <h1>Entrar a tu cuenta! </h1>
            <Form onSubmit={submit}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Nombre de Usuario</Form.Label>
                    <Form.Control type="text" placeholder="Ingresar Nombre de Usuario" onChange={(e)=> setUsername(e.target.value)} value={username} required/>
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Ingresar Contraseña" onChange={(e)=> setPassword(e.target.value)} value={password} required/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Entrar
                 </Button>
            </Form>
            </Card>
            
        </Container>
    )
}

export default LoginComponent
