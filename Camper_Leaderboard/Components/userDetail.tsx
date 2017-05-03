import * as React from 'react'


export interface User {
    username: string;
    img: string;
    alltime: string | number;
    recent: string | number;
    lastUpdate: Date;
}

interface UserDetailProps {
    user: User,
    id: number
    key: number
}

interface UserDetailState {
    user: User
}

export class UserDetail extends React.Component<UserDetailProps, UserDetailState> {

    constructor(props: UserDetailProps) {
        super(props);
    }

    render() {

        return <div className='userDetail tr'>
            <div className='userRank'>{this.props.id}</div>
            <img className='userAvatar' src={this.props.user.img}></img>
            <div className='userName'>{this.props.user.username}</div>
            <div className='points30'>{this.props.user.recent}</div>
            <div className='pointsAllTime'>{this.props.user.alltime}</div>
        </div>
    }
}
