import React, { Component } from "react";
import { Button, Input, List, Col, Card } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './Main.css'

export default class Main extends Component {
    state = {
        novaTarefa: '',
        tarefas: [],
        index: -1
    }

    componentDidMount() {
        const tarefas = JSON.parse(localStorage.getItem('tarefas'));

        if (!tarefas) return;

        this.setState({tarefas})
    }

    componentDidUpdate(prevProps, prevState) {
        const { tarefas } = this.state;

        if (tarefas === prevState.tarefas) return;
        localStorage.setItem('tarefas', JSON.stringify(tarefas))
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { tarefas, index } = this.state;
        let { novaTarefa } = this.state;
        novaTarefa = novaTarefa.trim()

        if(tarefas.indexOf(novaTarefa) !== -1 ) return;

        const novasTarefas = [...tarefas];

        if (index === -1) {
            this.setState({
                tarefas: [...novasTarefas, novaTarefa],
                novaTarefa: ''
            })
        } else {
            novasTarefas[index] = novaTarefa
            this.setState({
                tarefas: [...novasTarefas],
                index: -1,
                novaTarefa: ''
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            novaTarefa: e.target.value
        })
    }

    handleEdit = (e, index) => {
        const { tarefas } = this.state;
        this.setState({
            index,
            novaTarefa: tarefas[index]
        })
    }

    handleDelete = (e, index) => {
        const { tarefas } = this.state;
        const novasTarefas = [...tarefas]
        novasTarefas.splice(index,1);
        this.setState({
            tarefas: [...novasTarefas]
        })
    }

    countTarefas = () => {
        return this.state.tarefas.length
    }

    render() {
        const {novaTarefa, tarefas} = this.state
        return (
            <div className="main">
                <h1>Lista de Tarefas</h1>
                <div style={{display:"flex", justifyContent: 'space-between'}}>
                <Col span={11}>
                <Card style={{backgroundColor:'#9DBCD4'}} title="Volume de Tarefas" bordered={false}>
                    {this.countTarefas()}
                </Card>
                </Col>

                <Col span={11}>
                <Card style={{backgroundColor: '#32BF84'}} title="Tarefas Concluídas" bordered={false}>
                    {this.countTarefas()}
                </Card>
                </Col>

                </div>

                <form onSubmit={this.handleSubmit} action="#" className="form">
                    <Input onChange={this.handleChange} placeholder="Insira a Tarefa" value={novaTarefa} />
                    <Button type="primary" htmlType="submit" shape="circle" icon={<PlusOutlined />} />
                </form>

                <List
                    size="small"
                    bordered
                    className="tarefas"
                    dataSource={tarefas}
                    renderItem={(item, index) => (
                    <List.Item>
                        {item}
                        <div style={{ marginLeft: 'auto' }}>
                            <Button 
                                type="text" 
                                icon={<EditOutlined />} 
                                onClick={(e) => this.handleEdit(e, index)} 
                            />
                            <Button 
                                type="text" 
                                icon={<DeleteOutlined />} 
                                onClick={(e) => this.handleDelete(e, index)} 
                            />
                        </div>
                    </List.Item>)}    
                />
            </div>
        )
    }
}