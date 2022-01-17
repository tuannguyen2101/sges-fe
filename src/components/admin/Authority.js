import React, { Component } from 'react'

export default class Authority extends Component {

    isCheck = (acc, role) => {
        let check = false;
        this.props.authorities.forEach(auth => {
            if (auth.accountId === acc && auth.roleId === role) {
                check = true;
            }
        });
        return check
    }

    addAuthor = (acc, rol) => {
        this.props.addAuthor(acc, rol)
    }

    removeAuth = (acc, rol) => {
        let i = this.findAuth(acc, rol);
        if (i === 1) {
            alert("Can't delete this authority !");
            return;
        }
        this.props.removeAuthor(i);
    }

    findAuth = (acc, role) => {
        let id = -1;
        this.props.authorities.forEach(auth => {
            if (auth.accountId === acc && auth.roleId === role) {
                id = auth.id;
            }
        });
        return id
    }

    onChange = (event, acc, rol) => {
        let { checked } = event.target;
        checked ? this.addAuthor(acc, rol) : this.removeAuth(acc, rol)
    }

    render() {

        let { acc, role } = this.props

        const avt = acc.photo === null ? `https://www.chanchao.com.tw/vietnamwood/images/default.jpg` : `http://localhost:8080/file/read/${acc.photo}`

        return (
            <div className='phanquen-item'>
                <div className='row'>
                    <div>
                        <img className='avt-admin' src={avt}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                    "https://www.chanchao.com.tw/vietnamwood/images/default.jpg";
                            }}
                            alt='avt'
                        />
                    </div>
                    <div className='col-6'>
                        <div className='row'>
                            <div className='col-2'>Tên</div>
                            <div className='col-6'>: {acc.fullname}</div>
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className='row'>
                            <div className='col-2'>Username</div>
                            <div className='col-6'>: {acc.username}</div>
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className='row'>
                            <div className='col-2'>Email</div>
                            <div className='col-6'>: {acc.email}</div>
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className='row'>
                            <div className='col-2'>Trạng thái</div>
                            <div className='col-6'>: {
                                acc.status === 1 ? <span className='active-account'>Đang kích hoạt</span> : <span className='unactive-account'>Ngừng kich hoạt</span>
                            }</div>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='row'>
                            {
                                role.map((rol, index) => {
                                    return (
                                        <div className='col-2' key={index}>
                                            <span className='me-2'>{index === 0 ? "ADMIN" : index === 1 ? "STAFF" : "CUSTOMER"}</span>
                                            <input className='form-check-input' onChange={(event) => {
                                                this.onChange(event, acc.id, rol.id)
                                            }} type="checkbox" checked={this.isCheck(acc.id, rol.id)}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            // <tr>
            //     <td>{acc.fullname}</td>
            //     {
            //         role.map((rol, index) => {
            //             return <th key={index}><input onChange={(event) => {
            //                 this.onChange(event, acc.id, rol.id)
            //             }} type="checkbox" checked={this.isCheck(acc.id, rol.id)}></input></th>
            //         })
            //     }
            // </tr>
        )
    }
}
