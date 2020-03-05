import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { getAllPosts } from '../../actions/post';

const Posts = ( { getAllPosts }) => {
    return (
        <Fragment>
             <h1 className="large text-primary">
        Posts
      </h1>
      <p className="lead"><i className="fas fa-user"></i> Welcome to the community</p>

      <div className="post-form">
        <div className="bg-primary post-form-header ">
          <h4>Start a Discussion</h4>
        </div>

        <form className="form vert-m-1">
          <textarea cols="30" rows="5" placeholder="Create a post"></textarea>
          <input type="submit" value="Submit" className="btn btn-dark vert-m-1" />
        </form>

        {/* Posts */}
        <div className="posts">
          <div className="post bg-white vert-m-1 p-1">
            <div>
              <Link to={`/profile/${_id}`}>
                {/* <img
                  className="round-img"
                  src="img/luke-pamer-KBpnPk44tOA-unsplash.jpg"
                  alt=""
                /> */}
                <h4>John Doe</h4>
              </Link>
            </div>
            <div>
              <p className="vert-m-1">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Ratione dolores officia assumenda dolor maiores sint pariatur
                quia voluptatibus voluptate perspiciatis commodi possimus nemo
                aut, voluptas expedita facilis amet hic culpa.
              </p>
              <button className="btn">
                <i className="fas fa-thumbs-up"></i> <span>4</span>
              </button>
              <button className="btn">
                <i className="fas fa-thumbs-down"></i>
              </button>
              <Link to="/post" className="btn btn-primary">
                Discussion
              </Link>
            </div>
          </div>

          <div className="post bg-white vert-m-1 p-1">
            <div>
              <Link to={`/profile/${_id}`}>
                {/* <img
                  className="round-img"
                  src="img/luke-pamer-KBpnPk44tOA-unsplash.jpg"
                  alt=""
                /> */}
                <h4>John Doe</h4>
              </Link>
            </div>
            <div>
              <p className="vert-m-1">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est
                magni quos voluptatem perferendis veritatis facere.
              </p>
              <button className="btn">
                <i className="fas fa-thumbs-up"></i> <span>5</span>
              </button>
              <button className="btn">
                <i className="fas fa-thumbs-down"></i>
              </button>
              <Link to="/post" className="btn btn-primary">
                Discussion
              </Link>
            </div>
          </div>
        </div>
      </div>
        </Fragment>
    );

}

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getAllPosts })(Posts);