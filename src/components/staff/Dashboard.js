import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link, Outlet } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    drawer: {
        zIndex: "1",
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        backgroundColor: "#182537",
        width: drawerWidth,
    },
    links: {
        textDecoration: "none",
        color: "#C2C7CD",
    },
    content: {
        flexGrow: 1,
        fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
    },
}));

function Dashboard(props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const { auth } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const isAdmin = (roles) => {
        if (roles && roles.includes(1)) {
            return true;
        } else return false;
    };

    const isStaff = (roles) => {
        if (roles && roles.includes(2)) {
            return true;
        } else return false;
    };

    const drawer = (
        <div>
            <div className={classes.toolbar}>
                <Typography className="p-3" style={{ color: "white" }}>
                    S G E S
                </Typography>
            </div>
            <hr></hr>
            <List>
                <Link className={`${classes.links} link-admin`} to="/">
                    <ListItem button>
                        <i className="bi bi-house-door-fill me-2"></i>
                        <ListItemText className="link-admin" primary="Trang mua hàng" />
                    </ListItem>
                </Link>
                <Link className={`${classes.links} link-admin`} to="Thongke">
                    <ListItem button>
                        <i class="bi bi-clipboard-data me-2"></i>
                        <ListItemText className="link-admin" primary="Thống kê" />
                    </ListItem>
                </Link>
                <Link className={`${classes.links} link-admin`} to="TheoThang">
                    <ListItem button>
                        {/* <i className="bi bi-house-door-fill me-2"></i> */}
                        <ListItemText className="link-admin ps-4" primary="Theo tháng" />
                    </ListItem>
                </Link>
                <Link className={`${classes.links} link-admin`} to="Product">
                    <ListItem button>
                        <i className="bi bi-box-seam me-2"></i>
                        <ListItemText className="link-admin" primary="Sản phẩm" />
                    </ListItem>
                </Link>
                <Link className={`${classes.links} link-admin`} to="Category">
                    <ListItem button>
                        <i class="bi bi-tags me-2"></i>
                        <ListItemText className="link-admin" primary="Danh mục" />
                    </ListItem>
                </Link>
                <Link className={`${classes.links} link-admin`} to="Order">
                    <ListItem button>
                        <i class="bi bi-receipt-cutoff me-2"></i>
                        <ListItemText className="link-admin" primary="Hóa đơn" />
                    </ListItem>
                </Link>
                {/* {["Thongke", "TheoThang", "Product", "Category", "Order", "Customer"].map(
                    (text, index) => (
                        <Link key={index} className={classes.links} to={text.toLowerCase()}>
                            <ListItem button key={text}>
                                <i className="bi bi-file-earmark-ppt-fill me-2"></i>
                                <ListItemText primary={text} />
                            </ListItem>
                        </Link>
                    )
                )} */}
                {isAdmin(props.auth.roles) ? (
                    <Link className={`${classes.links} link-admin`}  to="Adminstrator">
                        <ListItem button>
                            <i class="bi bi-shield-exclamation me-2"></i>
                            <ListItemText primary="Phân quyền" />
                        </ListItem>
                    </Link>
                ) : (
                    <></>
                )}
            </List>
            <hr></hr>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar} style={{ zIndex: "1" }}>
                <Toolbar style={{ backgroundColor: "white", color: "#353A40" }}>
                    <div className="row w-100">
                        <Typography variant="h6" noWrap className="col-6">
                            Dashboard
                        </Typography>
                        <div className="col-6 d-flex justify-content-end">
                            <img
                                src="https://static-s.aa-cdn.net/img/ios/1109277833/0df781f42d16c739d841831e462bc99e"
                                width="30"
                                height="30"
                                className="d-inline-block align-top mx-2"
                                alt="avatar"
                                style={{ borderRadius: "50px", border: "1px solid" }}
                            />
                            <Typography variant="h5" noWrap>
                                {auth.fullName}
                            </Typography>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === "rtl" ? "right" : "left"}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content} style={{ paddingTop: "64px" }}>
                <Outlet />
            </main>
        </div>
    );
}

Dashboard.propTypes = {
    window: PropTypes.func,
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

export default connect(mapStateToProps)(Dashboard);
