import React from 'react';
import './Styles.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export default class Cars extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [],
            model: '',
            make: '',
            color: '',
            reg: '',
            owner: '',
            address: '',
            filter: '',
            newData: '',
            delId: '',
            UpdateProp: '',
            filterUpdate: '',
            oldieSent: '1'
        }
        this.handleModel = this.handleModel.bind(this);
        this.handleMake = this.handleMake.bind(this);
        this.handleColor = this.handleColor.bind(this);
        this.handleReg = this.handleReg.bind(this);
        this.handleNewSubmit = this.handleNewSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDataUpdate = this.handleDataUpdate.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleDelId = this.handleDelId.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddress = this.handleAddress.bind(this);
        this.handleOwner = this.handleOwner.bind(this);
        this.handleUpdateProp = this.handleUpdateProp.bind(this);
        this.handleFilterUpdate = this.handleFilterUpdate.bind(this);
        this.handleOldie = this.handleOldie.bind(this);
    }
    // handle change in model Form.Control field for new project
    handleModel(e) {
        e.preventDefault();
        this.setState({
            model: e.target.value
        })
    }
    // handle change in make Form.Control field for new project
    handleMake(e) {
        e.preventDefault();
        this.setState({
            make: e.target.value
        })
    }
    // handle change in color Form.Control field for new project
    handleColor(e) {
        e.preventDefault();
        this.setState({
            color: e.target.value
        })
    }
    // handle change in reg Form.Control field for new project
    handleReg(e) {
        e.preventDefault();
        this.setState({
            reg: e.target.value
        })
    }
    // handle change in Owner Form.Control field for new project
    handleOwner(e) {
        e.preventDefault();
        this.setState({
            owner: e.target.value
        })
    }
    // handle change in address Form.Control field for new project
    handleAddress(e) {
        e.preventDefault();
        this.setState({
            address: e.target.value
        })
    }

    // updates database with information user entered in add
    // new project field using a POST request
    handleNewSubmit() {
        alert('Added to Database: ' + this.state.model + ' ' + this.state.make + ' ' + this.state.color + ' ' + this.state.reg);
        fetch('/post', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: this.state.model,
                make: this.state.make,
                color: this.state.color,
                reg: this.state.reg,
                owner: this.state.owner,
                address: this.state.address,
                section: "cars"
            })
        }).then(res => res.json())
            .then(response => alert('project added!'), (error) => {
                throw error.message
            })

        window.location.reload();  // fetch data once more to display newly added project

    }
    // handles selection of filter key 
    handleFilter(e) {
        e.preventDefault();
        this.setState({
            filter: e.target.value
        })
    }
    // handles filter value entry in update car details section
    handleFilterUpdate(e) {
        this.setState({
            filterUpdate: e.target.value
        })
    }
    // handles selection of property to be updated
    handleUpdateProp(e) {
        e.preventDefault();
        this.setState({
            UpdateProp: e.target.value
        })
    }

    // handles new data entry in update car details section
    handleDataUpdate(e) {
        e.preventDefault();
        this.setState({
            newData: e.target.value
        })
    }

    // updates the details of a chosen project
    handleUpdate(e) {
        e.preventDefault();
        // if user chooses to update 1 item (first item that matches parameters)
        if (this.state.UpdateProp && this.state.filter && e.target.value === 'update1') {
            fetch('/putOne', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    filterUpdate: this.state.filterUpdate,
                    filter: this.state.filter,
                    propNew: this.state.UpdateProp,
                    propData: this.state.newData
                })
            }).then(res => res.json())
                .then(response => alert('project updated!'), (error) => {
                    throw error.message;
                })

            window.location.reload(); // fetch data once more to show updates
        }
        // if user chooses to updateALL items (all items that match parameters)
        if (this.state.UpdateProp && this.state.filter && e.target.value === 'updateAll') {
            fetch('/putAll', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    filterUpdate: this.state.filterUpdate,
                    filter: this.state.filter,
                    propNew: this.state.UpdateProp,
                    propData: this.state.newData
                })
            }).then(res => res.json())
                .then(response => alert('project updated!'), (error) => {
                    throw error.message;
                })

            window.location.reload(); // fetch data once more to show updates
        }

    }

    // handles entry of model of project to be deleted
    handleDelId(e) {
        e.preventDefault();
        this.setState({
            delId: e.target.value
        })
    }

    // handles deletion of selected project
    handleDelete(e) {
        e.preventDefault();
        fetch('/delete', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ reg: this.state.delId })
        }).then(res => res.json())
            .then((error) => {
                throw error.message;
            })

        window.location.reload(); // fetch data once more to show update
    }
    // toggles display of list of cars older than 2005
    handleOldie() {
        if (this.state.oldieSent === '1') {
            this.setState({
                oldieSent: '0'
            })
        } else if (this.state.oldieSent === '0') {
            this.setState({
                oldieSent: '1'
            })
        }
    }

    // fetches data from database when component mounts
    componentDidMount() {
        fetch("/get")
            .then(res => res.json())
            .then(response => {
                this.setState({
                    list: response
                })
            }, (error) => {
                console.log(error)
            })
    }

    render() {
        let oldArr = [];
        const jsonList = this.state.list;
        // render database information as a list
        const listItems = jsonList.map((item, index) => {
            return (
                <>
                    <ul>
                        <h3 className='projects-head'>{item.make}</h3>
                        <li key={index + Math.random() * 12} className='list-item-project'><span>model:</span> {item.model}</li>
                        <li key={index + Math.random() * 23} className='list-item-project'><span>color:</span> {item.color}</li>
                        <li key={index + Math.random() * 45} className='list-item-project'><span>Reg_Number:</span> {item.reg_number}</li>
                        <li key={index + Math.random() * 66} className='list-item-project'><span>Owner:</span> {item.owner}</li>
                        <li key={index + Math.random() * 69} className='list-item-project'><span>Address:</span> {item.address}</li>
                    </ul>
                </>
            );
        })
        // list of all vehicles older than 2005
        for (let i = 0; i < jsonList.length; i++) {
            if (parseInt(jsonList[i].model) < 2005) {
                oldArr.push(jsonList[i]);
            }
        }
        const OldieList = oldArr.map((item, index) => {
            return (
                <>
                    <ul>
                        <h3 className='projects-head'>{item.make}</h3>
                        <li key={index + Math.random() * 12} className='list-item-project'><span>model:</span> {item.model}</li>
                        <li key={index + Math.random() * 23} className='list-item-project'><span>color:</span> {item.color}</li>
                        <li key={index + Math.random() * 45} className='list-item-project'><span>Reg_Number:</span> {item.reg_number}</li>
                        <li key={index + Math.random() * 66} className='list-item-project'><span>Owner:</span> {item.owner}</li>
                        <li key={index + Math.random() * 69} className='list-item-project'><span>Address:</span> {item.address}</li>
                    </ul>
                </>
            );
        })
        return (
            <Container id='main-container'>
                <Row id='top-row'>
                    <h1 id='main-head'>Welcome to Your Car Database Management Portal</h1>
                </Row>
                <Row id='middle-row'>
                    <Col md={4}>
                        <h3 className='headings'>All Cars:</h3>
                        <div id='project-list-div'>

                            {listItems}
                        </div>
                    </Col>
                    <Col md={{ span: 4, offset: 2 }}>
                        <div id='new-project-div'>
                            <h3 className='headings'>Add New Car</h3>
                            <form onSubmit={this.handleNewSubmit}>
                                <Form.Label>
                                    Model:
                                     <Form.Control onChange={this.handleModel} name='new-model' id='new-model' type='text' placeholder='enter model' value={this.state.model} required />
                                </Form.Label>
                                <Form.Label>
                                    Make:
                                    <Form.Control onChange={this.handleMake} id='new-make' name='new-make' type='text' placeholder='enter make' value={this.state.make} />
                                </Form.Label>
                                <Form.Label>
                                    Color:
                                    <Form.Control onChange={this.handleColor} type='text' name='new-descr' id='new-descr' placeholder='enter color' value={this.state.color} />
                                </Form.Label>
                                <Form.Label>
                                    Reg_number:
                                     <Form.Control onChange={this.handleReg} type='text' name='new-reg' id='new-ur;' placeholder='enter number' value={this.state.reg} />
                                </Form.Label>
                                <Form.Label>
                                    Owner:
                                     <Form.Control onChange={this.handleOwner} type='text' name='new-owner' id='new-own;' placeholder='enter owner' value={this.state.owner} />
                                </Form.Label>
                                <Form.Label>
                                    Address:
                                     <Form.Control onChange={this.handleAddress} type='text' name='new-reg' id='new-reg' placeholder='enter address' value={this.state.address} />
                                </Form.Label>

                                <Button variant='success' type='submit'>ADD</Button>
                            </form>
                        </div>
                    </Col>
                </Row>

                <Row id='lower-row'>
                    <Col>
                        <div>
                            <h3 className='headings'>Update Car Details</h3>
                            <form>
                                <Form.Label>
                                    Choose Filter Key:
                                    <select onClick={this.handleFilter}>
                                        <option>None</option>
                                        <option value='model'>Model</option>
                                        <option value='make'>Make</option>
                                        <option value='color'>Color</option>
                                        <option value='reg_number'>Reg_Number</option>
                                        <option value='owner'>Owner</option>
                                        <option value='address'>Address</option>
                                    </select>
                                    <Form.Control onChange={this.handleFilterUpdate} type='text' id='model-edit' name='model-edit' placeholder='enter filter value' value={this.state.filterUpdate} required />
                                </Form.Label>
                                <Form.Label>
                                    Choose Property to Update:
                                    <select onClick={this.handleUpdateProp}>
                                        <option>None</option>
                                        <option value='model'>Model</option>
                                        <option value='make'>Make</option>
                                        <option value='color'>Color</option>
                                        <option value='reg_number'>Reg_Number</option>
                                        <option value='owner'>Owner</option>
                                        <option value='address'>Address</option>
                                    </select>
                                    <Form.Control onChange={this.handleDataUpdate} type='text' id='make-edit' name='make-edit' placeholder='enter new data' value={this.state.newData} required />
                                </Form.Label>
                                <br />
                                <Button onClick={this.handleUpdate} variant='primary' value='update1'>UPDATE 1</Button><Button id='update-all' onClick={this.handleUpdate} variant='primary' value='updateAll'>UPDATE ALL</Button>
                            </form>
                        </div>
                    </Col>
                    <Col>
                        <div>
                            <h3 className='headings'>Delete a Car</h3>
                            <form onSubmit={this.handleDelete}>
                                <Form.Label>
                                    Filter:
                                    <Form.Control onChange={this.handleDelId} type='text' name='model-delete' id='model-delete' placeholder='enter Registration Number' value={this.state.delId} required />
                                </Form.Label>
                                <br />
                                <Button variant='danger' type='submit'>DELETE</Button>

                            </form>
                        </div>
                    </Col>
                </Row>
                <Row id='oldie-row'>
                    <Col md={4}>
                        <h3 className='headings'>All Cars older than 2005:</h3>
                        <Button id='show-oldie' onClick={this.handleOldie} variant='dark'>SHOW / HIDE</Button>
                        <div id='project-list-div'>
                            {this.state.oldieSent === '0' && OldieList}
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}