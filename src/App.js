import React from "react"
import styled from "styled-components"
import { CircularProgress, TextField, Snackbar } from "@material-ui/core"

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            images: null,
            phonenumber: "",
        }
    }
    componentDidMount() {
        // Load the images to sell.s
        fetch("https://picsum.photos/v2/list?limit=4")
            .then((resp) => resp.json())
            .then((resp) => {
                const images = resp
                this.setState({
                    images: images.map((i) => ({
                        download_url: i.download_url,
                        cost: Math.floor(Math.random() * 10) + 1,
                    })),
                    loading: false,
                })
            })
    }
    getCode(i) {
        const { images, phonenumber } = this.state
        if (!phonenumber.trim()) {
            const error = "Phone number is required"
            this.setState({ images, error })
            return
        }
        this.setState({ loading: true, error: null })

        fetch("https://sancom-gaxblohzcq-uc.a.run.app/make/order", {
            method: "POST",
            body: JSON.stringify({
                amount: `${images[i].cost}`,
                phonenumber: phonenumber.trim(),
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => {
                if (resp.status === 200) {
                    // Set QR code
                    resp.blob().then((blb) => {
                        const reader = new FileReader()
                        reader.readAsDataURL(blb)
                        reader.onloadend = () => {
                            images[i].code = reader.result
                            this.setState({ loading: false, images })
                        }
                    })
                }
            })
            .catch((err) => {
                images[i].code = null
                const error = "An error occurred, please retry."
                this.setState({
                    loading: false,
                    images,
                    error,
                })
            })
    }
    render() {
        const { loading, images, phonenumber, error } = this.state
        return (
            <Body>
                <img className="logo" alt="" src="/banner.png" />
                <div className="inner">
                    {loading && <CircularProgress className="progress" />}
                    {!loading && (
                        <TextField
                            placeholder="254........"
                            label="Phone Number"
                            style={{ margin: 16 }}
                            value={phonenumber}
                            onChange={(evt) =>
                                this.setState({
                                    phonenumber: evt.currentTarget.value,
                                })
                            }
                        />
                    )}
                    {Boolean(images !== null && !loading) && (
                        <div className="images">
                            {images.map((img, i) => (
                                <ImageObject key={i}>
                                    <img
                                        className="main"
                                        src={img.download_url}
                                        alt=""
                                    />
                                    {Boolean(img.code) && (
                                        <img
                                            className="qr"
                                            src={img.code}
                                            alt=""
                                        />
                                    )}
                                    {!img.code && (
                                        <button
                                            className="buy"
                                            onClick={this.getCode.bind(
                                                this,
                                                i
                                            )}>
                                            Buy @{img.cost}
                                        </button>
                                    )}
                                </ImageObject>
                            ))}
                        </div>
                    )}
                </div>
                {Boolean(error) && <Snackbar open={true} message={error} />}
            </Body>
        )
    }
}

const Body = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    .inner {
        width: 800px;
        display: flex;
        padding: 1em 0.5em;
        flex-direction: column;
        .progress {
            align-self: center;
        }
        .images {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
        }
    }
    .logo {
        height: 200px;
        width: auto;
    }
    @media (max-width: 850px) {
        .inner {
            width: 95%;
        }
    }
`

const ImageObject = styled.div`
    width: calc(50% - 25px);
    position: relative;
    background-color: #f1f1f1;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    border-radius: 5px;
    .buy {
        padding: 0.5em 1em;
        background-color: #1b5e20ee;
        border-radius: 1em;
        outline: none;
        color: #ffffff;
        cursor: pointer;
        border: 1px solid #ffffff;
        min-width: 100px;
        align-self: center;
        bottom: 1em;
        position: absolute;
        &:hover {
            background-color: #1b5e20;
        }
    }
    img.main {
        width: 100%;
        height: auto;
    }
    img.qr {
        width: 50%;
        align-self: center;
        bottom: 1em;
        position: absolute;
        opacity: 0.8;
    }
`
