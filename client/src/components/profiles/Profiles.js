import React, { Fragment } from 'react';

const Profiles = () => {
    return (
        <Fragment>
            <h1 class="large text-primary">
                Explorers
            </h1>
            <p class="lead">
                <i class="fab fa-connectdevelop"></i> Browse and connect with explorers
            </p>
            <div class="profiles">
                <div class="profile bg-light">
                    <img
                        class="round-img"
                        src="img/luke-pamer-KBpnPk44tOA-unsplash.jpg"
                        alt="hiker"
                    />

                    <div>
                        <h2>John Doe</h2>
                        <p>Seattle, WA</p>
                        <a href="profile.html" class="btn btn-primary">
                        View Profile
                        </a>
                    </div>

                    <ul>
                        <li class="text-primary"><i class="fas fa-check"></i> Camping</li>
                        <li class="text-primary"><i class="fas fa-check"></i> Hiking</li>
                    </ul>
                    
                    </div>

                    <div class="profile bg-light">
                    <img
                        class="round-img"
                        src="img/joshua-reddekopp-9BpTTLoTv9w-unsplash.jpg"
                        alt=""
                    />

                    <div>
                        <h2>Jane Doe</h2>
                        <p>Denver, CO</p>
                        <a href="profile.html" class="btn btn-primary">
                        View Profile
                        </a>
                    </div>

                    <ul>
                        <li class="text-primary"><i class="fas fa-check"></i> Hiking</li>
                        <li class="text-primary"><i class="fas fa-check"></i> Kayaking</li>
                        <li class="text-primary">
                        <i class="fas fa-check"></i> Snowboarding
                        </li>
                    </ul>
                </div>
            </div>
        </Fragment>
    );
}

export default Profiles;