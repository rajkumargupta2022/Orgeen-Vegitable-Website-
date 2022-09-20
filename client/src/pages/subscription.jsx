import React from "react";
import { Link } from 'react-router-dom';

class Subscription extends React.Component {

    render() {
        return (
            <>
                <div className="container-fluid bg-main">
                    <section className="subscription-main-s">
                        <h1>Monthly Subscription Plans </h1>
                        <hr className="msp-hr" /><br />
                        <div className="row">
                            <div className="col-lg-12 col-sm-12 col-xs-12 banner">
                            <Link to="monthly-subscription-plan">

                                <img className="img-fluid" src="assets/img/uploads/2022/02/Subscription-plans-copy-min-scaled.jpg" alt="subscription-plan" />
                                </Link>

                                <h4 className="pt-4 pb-4">Orgeen is here to supply you with your daily dose of nutrition at your doorstep.Choose your monthly subscription plan
                                    according to your consumption and convenience.
                                </h4>
                            </div>
                        </div>
                        <div className="row pb-4">
                            <div className="col-lg-6 col-sm-6 col-xs-12">
                                <img className="img-fluid" src="assets/img/uploads/2022/03/hydroponics-vegetable-farm-2021-09-02-15-15-26-utc-1024x1024.jpg" alt="" />
                            </div>
                            <div className="col-lg-6 col-sm-6 col-xs-12 toggle-section pt-xs-4">
                                <div id="main">
                                    <div className="container">
                                        <div className="accordion" id="faq">
                                            <div className="card shadow">
                                                <div className="card-header" id="faqhead1">
                                                    <a href="#" className="btn btn-header-link" data-toggle="collapse" data-target="#faq1"
                                                        aria-expanded="true" aria-controls="faq1"><b>How to subscribe for Monthly Subscription plan?</b></a>
                                                </div>
                                                <div id="faq1" className="collapse show" aria-labelledby="faqhead1" data-parent="#faq">
                                                    <div className="card-body">
                                                        You can purchase the subscription plan from the Shop page or simply click on the image above to navigate to the subscription plans.
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card shadow">
                                                <div className="card-header" id="faqhead2">
                                                    <a href="#" className="btn btn-header-link collapsed" data-toggle="collapse" data-target="#faq2"
                                                        aria-expanded="true" aria-controls="faq2"><b>How can I avail discount on Monthly Subscription plan?</b></a>
                                                </div>

                                                <div id="faq2" className="collapse" aria-labelledby="faqhead2" data-parent="#faq">
                                                    <div className="card-body">
                                                        Once you buy a subscription plan from the shop page, we would send you an email of your personalized coupon code from which you can avail flat discount and free shipping
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card shadow">
                                                <div className="card-header" id="faqhead3">
                                                    <a href="#" className="btn btn-header-link collapsed" data-toggle="collapse" data-target="#faq3"
                                                        aria-expanded="true" aria-controls="faq3"><b>Can I discontinue my subscription pack?</b></a>
                                                </div>
                                                <div id="faq3" className="collapse" aria-labelledby="faqhead3" data-parent="#faq">
                                                    <div className="card-body">
                                                        No, you cannot discontinue your subscription pack in the middle. The plan will be applicable for the entire 30 days duration.
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card shadow">
                                                <div className="card-header" id="faqhead4">
                                                    <a href="#" className="btn btn-header-link collapsed" data-toggle="collapse" data-target="#faq4"
                                                        aria-expanded="true" aria-controls="faq4"><b>Can I get a refund on the Monthly Subscription package?</b></a>
                                                </div>
                                                <div id="faq4" className="collapse" aria-labelledby="faqhead4" data-parent="#faq">
                                                    <div className="card-body">
                                                        No, you cannot get a refund once you subscribe.
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card shadow">
                                                <div className="card-header" id="faqhead5">
                                                    <a href="#" className="btn btn-header-link collapsed" data-toggle="collapse" data-target="#faq5"
                                                        aria-expanded="true" aria-controls="faq5"><b>What can privilege pass get me?</b></a>
                                                </div>
                                                <div id="faq5" className="collapse" aria-labelledby="faqhead4" data-parent="#faq">
                                                    <div className="card-body">
                                                        Privilege pass is valid for upto 4 people who would be allowed to visit the Orgeen farms and have a great modern farm experience.
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card shadow">
                                                <div className="card-header" id="faqhead6">
                                                    <a href="#" className="btn btn-header-link collapsed" data-toggle="collapse" data-target="#faq6"
                                                        aria-expanded="true" aria-controls="faq6"><b>Can I transfer my privilege pass to my friend?</b></a>
                                                </div>
                                                <div id="faq6" className="collapse" aria-labelledby="faqhead4" data-parent="#faq">
                                                    <div className="card-body">
                                                        No, the main account holder has to be present to use the privilege pass. This pass is non-transferable.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>
                </div>
            </>
        )
    }
}
export default Subscription