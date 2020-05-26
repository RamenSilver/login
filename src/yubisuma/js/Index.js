import React from 'react';
import { Link } from 'react-router-dom';

import firebase, { db } from '../../Firebase';

class Index extends React.Component {
    render() {
        return (
            <div className="container">
                <h3 className="text-center my-5">一覧表示</h3>
                <div className="my-3"><Link to="/create">新規登録</Link></div>
            </div>
        );
    }
}

export default Index;
