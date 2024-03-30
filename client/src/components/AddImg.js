import React from "react";

class AddImg extends React.Component {
    state = {
        file: null,
        base64URL: "ynht4ex"
    };

    getBase64 = file => {
        return new Promise(resolve => {
            let fileInfo;
            let baseURL = "";
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                baseURL = reader.result;
                resolve(baseURL);
            };
        });
    };

    handleFileInputChange = e => {
        let { file } = this.state;

        file = e.target.files[0];

        this.getBase64(file)
            .then(result => {
                file["base64"] = result;
                this.setState({
                    base64URL: result,
                    file
                });
            })
            .catch(err => {
                console.log(err);
            });

        this.setState({
            file: e.target.files[0]
        });
        this.send()
    };
    componentDidUpdate() {
        this.send()
    }
    send() {
        this.props.add(this.state.base64URL)
    }
    render() {
        return (
            <div>
                <input required type="file" name="file" onChange={this.handleFileInputChange} />
                {this.state.base64URL.length > 0 && <img src={this.state.base64URL}></img>}
            </div>
        );
    }
}

export default AddImg;
