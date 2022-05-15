import React, { Component } from 'react'
import {
    Container, Form, Col, Button
    , Navbar, Nav, Alert, Badge
    , Table, Tabs, Tab, Modal
} from "react-bootstrap";

// import { NavLink } from "react-router-dom";
import axios from 'axios'
import swal from 'sweetalert'

export class Dashboard extends Component {
    state = {
        destino: '',
        tag: '',
        urls: [],
        items: [],
        showItemModal: false,
        item: {
            nombre: '',
            descripcion: '',
            short_descripcion: '',
            precio: 0,
            imagen: [''],
            vendido: undefined
        },
        isEditing: false,
        id: ''
    }
    submit = async (e) => {
        e.preventDefault();
        const res = await axios.post(`${process.env.REACT_APP_API_URL}url/new`, {
            destino: this.state.destino,
            tag: this.state.tag
        }, {
            headers: {
                "token": await localStorage.getItem('at'),
                "Content-Type": "application/json"
            }
        })
        this.setState({ destino: '', tag: '' })
        this.copyShortToClipboard(res.data.tag)
        swal("URL Creada", `${process.env.REACT_APP_API_URL}${res.data.tag}`, "success");
        this.getUrls()

    }
    getUrls = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}url/all`, {
            headers: {
                "token": await localStorage.getItem('at')
            }
        })
        this.setState({
            urls: res.data
        })
    }
    getVentas = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}ventas/all`, {
            headers: {
                "token": await localStorage.getItem('at')
            }
        })
        this.setState({
            items: res.data
        })
    }
    submitItem = async (e) => {
        e.preventDefault();
        if (!this.state.item.descripcion || !this.state.item.precio || !this.state.item.short_descripcion || !this.state.item.nombre) {
            swal("Error", "Todos los campos son obligatorios", "error");
            return
        } else {
            try {
                console.log(this.state.item);
                const res = await axios.post(`${process.env.REACT_APP_API_URL}ventas/new`, {
                    ...this.state.item
                }, {
                    headers: {
                        "token": await localStorage.getItem('at'),
                        "Content-Type": "application/json"
                    }
                })
                this.getVentas();
                this.setState({
                    showItemModal: false,
                    item: {}
                })
                console.log(res.data);
            } catch (error) {
                console.error(error);
            }
        }
    }
    submitEditItem = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}ventas/edit/${this.state.id}`, this.state.item, {
                headers: {
                    "token": await localStorage.getItem('at')
                }
            })
            this.setState({
                showItemModal: false,
                item: {},
                isEditing: false,
                id: ''
            })
            this.getVentas();
        } catch (error) {
            console.error(error);
        }
    }
    deleteItem = async (id) => {
        const confirm = window.confirm("estas seguro bro?");
        if (confirm) {
            try {
                const res = await axios.delete(`${process.env.REACT_APP_API_URL}ventas/${id}`, {
                    headers: {
                        "token": await localStorage.getItem('at')
                    }
                })
                this.getVentas();
                console.log(res.data);
            } catch (error) {
                console.error(error);
            }
        }
    }
    marcarComoVendido = async (id) => {
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}ventas/vendido/${id}`, {}, {
                headers: {
                    "token": await localStorage.getItem('at')
                }
            })
            this.getVentas();
        } catch (error) {
            console.error(error);
        }
    }
    marcarComoNoVendido = async (id) => {
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}ventas/novendido/${id}`, {}, {
                headers: {
                    "token": await localStorage.getItem('at')
                }
            })
            this.getVentas();
        } catch (error) {
            console.error(error);
        }
    }
    openEditModal = async (item) => {
        console.log(item);
        await this.setState({
            isEditing: true,
            showItemModal: true,
            item:{
                ...item,
                imagen: item.imagen.join('\n')
            },
            id: item._id
        });
    }

    componentDidMount = () => {
        this.getUrls();
        this.getVentas();
    }
    copyShortToClipboard = (tag) => {
        navigator.clipboard.writeText(`${process.env.REACT_APP_API_URL}${tag}`)
    }
    deleteUrl = async (id) => {
        // console.log(id);
        // await axios.delete(process.env.REACT_APP_API_URL + 'url/' + id, {})
        await axios.delete(`${process.env.REACT_APP_API_URL}url/${id}`, {
            headers: {
                "token": await localStorage.getItem('at')
            }
        })
        this.getUrls()
    }
    logout = async () => {
        localStorage.clear();
        window.location.reload()
    }
    onChangeItem = (e) => {
        switch (e.target.type) {
            case 'number':
                this.setState({
                    item: {
                        ...this.state.item,
                        [e.target.id]: parseInt(e.target.value, 10)
                    }
                })
                break;
            default:
                this.setState({
                    item: {
                        ...this.state.item,
                        [e.target.id]: e.target.value
                    }
                })
                break;
        }
    }
    render() {
        return (
            <>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/">Panel de Control</Navbar.Brand>
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
                <Tabs defaultActiveKey="ventas" id="uncontrolled-tab-example" className="mb-3" variant="pills">
                    <Tab eventKey="urls" title="URLs">
                        <Container style={{ background: 'white' }} className="centered p-3 rounded" >

                            {/* <Button variant="outline-secondary" onClick={() => this.getUrls()}>Reload</Button> */}

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
                            <div className="d-none d-lg-block">
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
                            <div className="d-lg-none">
                                {this.state.urls.map((url) => {
                                    return (
                                        <Alert variant="secondary" key={url._id}>
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
                    </Tab>
                    <Tab eventKey="ventas" title="Ventas">
                        <Button variant="dark" onClick={() => this.setState({
                            showItemModal: true, isEditing: false, item: {
                                nombre: '',
                                descripcion: '',
                                short_descripcion: '',
                                precio: 0,
                                imagen: [''],
                                vendido: undefined
                            }, id: ''
                        })}>Crear item</Button>
                        <Modal show={this.state.showItemModal} onHide={() => this.setState({ showItemModal: false })}>
                            <Modal.Header closeButton>
                                <Modal.Title>{this.state.isEditing ? 'Editar' : 'Crear'} item ({this.state.id})</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="nombre"
                                            autoFocus
                                            onChange={this.onChangeItem}
                                            value={this.state.item['nombre']}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Descripcion Corta</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="short_descripcion"
                                            onChange={this.onChangeItem}
                                            value={this.state.item['short_descripcion']}
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                    >
                                        <Form.Label>Descripcion larga</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            id="descripcion"
                                            onChange={this.onChangeItem}
                                            value={this.state.item['descripcion']}

                                        />
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                    >
                                        <Form.Label>Precio</Form.Label>
                                        <Form.Control
                                            type="number"
                                            id="precio"
                                            onChange={this.onChangeItem}
                                            value={this.state.item['precio']}
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                    >
                                        <Form.Label>Imagenes (separadas por ENTER)</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            id="imagen"
                                            onChange={this.onChangeItem}
                                            value={this.state.item['imagen']}
                                        />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => this.setState({ showItemModal: false })}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={(e) => this.state.isEditing ? this.submitEditItem(e) : this.submitItem(e)}>
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <hr />
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Vendido</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.items.map((item) => {
                                    return (
                                        <tr key={item._id}>
                                            <td><a href={`https://ventas.ezegatica.com/items/${item._id}`} target="_blank" rel="noreferrer">{item.nombre}</a></td>
                                            <td>{item.vendido ? 'Si' : 'No'}</td>
                                            <td>
                                                {item.vendido ?
                                                    <Button variant="secondary" onClick={() => this.marcarComoNoVendido(item._id)}>Marcar como NO vendido</Button>
                                                    :
                                                    <Button variant="dark" onClick={() => this.marcarComoVendido(item._id)}>Marcar como vendido</Button>
                                                } {' '}
                                                <Button variant="success" onClick={() => this.openEditModal(item)}>Editar</Button> {' '}
                                                <Button variant="danger" onClick={() => this.deleteItem(item._id)}>Borrar</Button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Tab>
                </Tabs>

            </>
        )
    }
}

export default Dashboard
