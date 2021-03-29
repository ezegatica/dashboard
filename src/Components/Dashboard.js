import React, { Component } from 'react'
import {
    Container, Form, Col, Button
    , Navbar, Nav, Alert, Badge
    , Table
} from "react-bootstrap";
// import { NavLink } from "react-router-dom";
import axios from 'axios'
import swal from 'sweetalert'

export class Dashboard extends Component {
    state = {
        destino: '',
        tag: '',
        urls: []
    }
    submit = async (e) => {
        e.preventDefault();
        const res = await axios.post(process.env.REACT_APP_API_URL + 'url', {
            destino: this.state.destino,
            tag: this.state.tag
        })
        this.setState({ destino: '', tag: '' })
        this.copyShortToClipboard(res.data.tag)
        swal("URL Creada", `${process.env.REACT_APP_API_URL}${res.data.tag}`, "success");
        this.getUrls()

    }
    getUrls = async () => {
        const res = await axios.get(process.env.REACT_APP_API_URL + 'url')
        this.setState({
            urls: res.data
        })
    }
    componentDidMount = () => {
        this.getUrls()
    }
    copyShortToClipboard = (tag) => {
        navigator.clipboard.writeText(`${process.env.REACT_APP_API_URL}${tag}`)
    }
    deleteUrl = async (id) => {
        console.log(id);
        await axios.delete(process.env.REACT_APP_API_URL + 'url/' + id)
        this.getUrls()
    }
    logout = async () => {
        await axios.get(process.env.REACT_APP_API_URL + 'auth/logout')
        window.location.reload()
    }
    render() {
        return (
            <>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/">URL Shortener</Navbar.Brand>
                    <Nav className="mr-auto">
                        {/* <NavLink className="nav-link" to="/">Home</NavLink> */}
                    </Nav>
                    <Nav className="justify-content-end">
                        <Navbar.Text style={{ marginRight: '10px' }}>
                            Logueado como: <span style={{ color: 'white' }}>admin</span>
                        </Navbar.Text>
                        <Button className="nav-link" variant="outline-secondary" onClick={() => this.logout()}>Logout</Button>
                    </Nav>
                </Navbar>

                {/* <div class="d-lg-none">PANTALLA CHICA</div>
                <div class="d-none d-lg-block">PANTALLA GRANDEEEE</div>
                 */}
                <Container style={{ background: 'white' }} className="centered p-3 rounded" >
                    <Form onSubmit={this.submit} >
                        <Form.Row onSubmit={() => console.log("b")}>
                            <Col xs={6} xl={8} md={7} lg={9}>
                                <Form.Control placeholder="URL Larga" required type="url" spellCheck onChange={(e) => this.setState({ destino: e.target.value })} value={this.state.destino} />
                            </Col>
                            <Col xs={4} xl={3} md={3} lg={2}>
                                <Form.Control placeholder="Tag (opcional)" onChange={(e) => this.setState({ tag: e.target.value })} value={this.state.tag} />
                            </Col>
                            <Col>
                                <Button variant="outline-dark" type="submit">Enviar</Button>
                            </Col>
                        </Form.Row>
                    </Form>
                    <br />

                    {/* PANTALLA GRANDE */}
                    <div class="d-none d-lg-block">
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Destino</th>
                                    <th>URL Acortada</th>
                                    <th>Visitas</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.urls.map((url) => {
                                    return (
                                        <tr key={url._id}>
                                            <td><a href={url.destino}>{url.destino}</a></td>
                                            <td><a href={`${process.env.REACT_APP_API_URL}${url.tag}`} target="_blank" rel="noreferrer">{process.env.REACT_APP_API_URL}{url.tag}</a></td>
                                            <td>{url.conteo}</td>
                                            <td>
                                                <Button variant="success" onClick={() => this.copyShortToClipboard(url.tag)}>Copiar</Button> {' '}
                                                <Button variant="danger" onClick={() => this.deleteUrl(url._id)}>Borrar</Button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </div>

                    {/* PANTALLA CHICA */}
                    <div class="d-lg-none">
                        {this.state.urls.map((url) => {
                            return (
                                <Alert variant="secondary">
                                    <p>
                                        <Alert.Link href={url.destino}>{url.destino}</Alert.Link><br />
                                        <a href={`${process.env.REACT_APP_API_URL}${url.tag}`} target="_blank" rel="noreferrer">{process.env.REACT_APP_API_URL}{url.tag} </a><Badge pill variant="light">{url.conteo} clicks</Badge>
                                    </p>


                                    <hr />
                                    <Button variant="success" onClick={() => this.copyShortToClipboard(url.tag)}>Copiar</Button> {' '}
                                    <Button variant="danger" onClick={() => this.deleteUrl(url._id)}>Borrar</Button>
                                </Alert>
                            )
                        })}
                    </div>


                </Container>
            </>
        )
    }
}

export default Dashboard
