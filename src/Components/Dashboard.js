import React, { Component } from 'react'
import {
    Container, Form, Col, Button, Table
    // Navbar, Nav, FormControl
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
        this.copyShortToClipboard(res.data.tag)
        swal("URL Creada", `${process.env.REACT_APP_API_URL}${res.data.tag}`, "success");
        this.getUrls()

    }
    getUrls = async () => {
        const res = await axios.get(process.env.REACT_APP_API_URL+'url')
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
        await axios.delete(process.env.REACT_APP_API_URL+'url/'+id)
        this.getUrls()
    }
    render() {
        return (
            <>
                {/* <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/">URL Shortener</Navbar.Brand>
                    <Nav className="mr-auto">
                        <NavLink className="nav-link" to="/">Home</NavLink>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-info">Search</Button>
                    </Form>
                </Navbar> */}

                <Container style={{ background: 'white' }} className="centered p-3 rounded" >
                    <Form onSubmit={this.submit} >
                        <Form.Row onSubmit={() => console.log("b")}>
                            <Col xs={6} xl={8} md={7} lg={9}>
                                <Form.Control placeholder="URL Larga" required type="url" spellCheck onChange={(e) => this.setState({ destino: e.target.value })} />
                            </Col>
                            <Col xs={4} xl={3} md={3} lg={2}>
                                <Form.Control placeholder="Tag (opcional)" onChange={(e) => this.setState({ tag: e.target.value })} />
                            </Col>
                            <Col>
                                <Button variant="outline-dark" type="submit">Enviar</Button>
                            </Col>
                        </Form.Row>
                    </Form>
                    <br />
                    <Table striped bordered hover>
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
                                            <Button variant="success" onClick={() => this.copyShortToClipboard(url.tag)}>Copy</Button> {' '}
                                            <Button variant="danger" onClick={() => this.deleteUrl(url._id)}>Delete</Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Container>
            </>
        )
    }
}

export default Dashboard
