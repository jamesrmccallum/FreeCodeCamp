import * as React from 'react'
import { UserDetail, User } from './userDetail'
import { TableHeader } from './tableHeader'

interface UserTableProps {
}

interface UserTableState {
    userList: User[];
}

export class UserTable extends React.Component<UserTableProps, UserTableState> {

    constructor(props: UserTableProps) {
        super(props);
        this.state = { userList: [] }
    }

    componentDidMount() {
        window.fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
            .then(r => {
                return r.json()
            })
            .then(j => {
                this.setState(
                    {
                        userList: this.parseUserList(j)
                    })
            })
            .catch(e => console.log(e))
    }

    private parseUserList(l: User[]) {
        return l.map(u => {
            return {
                username: u.username,
                img: u.img,
                alltime: parseInt(u.alltime as string),
                recent: parseInt(u.recent as string),
                lastUpdate: u.lastUpdate
            }
        })
    }

    sortByTotal = (e) => {
        e.preventDefault();
        let list = this.state.userList.sort((a, b) => {
            return (b.alltime as number) - (a.alltime as number);
        })

        console.log(list[0])

        this.setState(
            {
                userList: list
            });
    }

    sortByRecent = (e) => {
        e.preventDefault();
        let list = this.state.userList.sort((a, b) => {
            return (b.recent as number) - (a.recent as number);
        })

        console.log(list[0])


        this.setState(
            {
                userList: list
            });

    }

    render() {

        return <div className="userTable">
            <TableHeader
                sortRecent={this.sortByRecent}
                sortTotal={this.sortByTotal}>
            </TableHeader>
            {
                this.state.userList.map((u, i) => {
                    return <UserDetail key={i + 1} id={i + 1} user={u}></UserDetail>
                })
            }
        </div>
    }
}











