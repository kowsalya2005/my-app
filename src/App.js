import React, { Component } from 'react';
import axios from 'axios';
import ReactPaginate from "react-paginate";
import "./App.css";
import { Table } from 'semantic-ui-react';
class App extends Component {
    constructor() {
        super();
        this.state = {
            userList: [],
            offset: 0,
        };
        this.userListMock=[];
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    receivedData() {
    axios.get('https://reqres.in/api/users?page=2')
        .then((res) => {
            const userListMock = res.data.data;
            if (res.data.page)
            {
            this.userListMock = userListMock;
            }
            const page = res.data.page;
            const perPage = res.data.per_page;
            const total = res.data.total;
            const totalPage = res.data.total_pages;
            const pageCount=  Math.ceil(userListMock.length / perPage);
            this.setState({ 
              userList:userListMock,
              page,
              perPage,
              totalPage,
              total,
              pageCount,

            });
        });
}

handlePageClick = (e) => {
  const {perPage} = this.state;
  const selectedPage = e.selected;
  const offset = selectedPage * perPage;
  this.setState(
    {
      currentPage: selectedPage,
      offset: offset
    },
    () => {
      this.receivedData();
    }
  );
};

componentDidMount() {
  this.receivedData();
}

render() {
    const { userList,offset } = this.state;
    return (
        <>
            <div className="app-container">
                <div className = "display-header">
                    <h2 className="text">User Details</h2>
                </div>
                {offset > 0 ? (
                <Table className="table">
                <Table.Header>
                <Table.Row>
                <Table.HeaderCell>First Name</Table.HeaderCell>
                <Table.HeaderCell>Last Name</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>Image</Table.HeaderCell>
                </Table.Row>
                </Table.Header>
                <Table.Body>
                      {userList.map((user) => (
                          <Table.Row key={user.id}>
                          <Table.Cell>{user.first_name}</Table.Cell>
                          <Table.Cell>{user.last_name}</Table.Cell>
                          <Table.Cell>{user.email}</Table.Cell>
                          <Table.Cell><img src={user.avatar} alt="" /></Table.Cell>
                          </Table.Row>
                       ))}
                </Table.Body>   
                </Table>):('')}
                   <ReactPaginate
                       previousLabel="&laquo;"
                       nextLabel="&laquo;"
                       breakLabel={"..."}
                       breakClassName={"break-me"}
                       pageCount={this.state.page}
                       onPageChange={this.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"}
                      />
                 </div>
               </>
    );
}
}
export default App;

