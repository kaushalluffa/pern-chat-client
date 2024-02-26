import AppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Popover,
  TextField,
} from "@mui/material";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import { useLocation, useNavigate } from "react-router-dom";
import { createConversation, getConversation } from "@/api/conversations";
import Search from "@mui/icons-material/Search";
import SettingIcon from "@mui/icons-material/Settings";
import React, { useEffect, useState } from "react";
import { getAllUsers } from "@/api/users";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useAuthContext } from "@/contexts/AuthContext";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import OutboundIcon from "@mui/icons-material/Outbound";
import { sendMessage } from "@/api/messages";
import { useConversationContext } from "@/contexts/ConversationContext";
import { Conversation, Member, Message, User } from "@/utils/types";

const drawerWidth = 320;

export default function ResponsiveDrawer() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [allUsers, setAllUsers] = useState([]);
  const [openNewChatModal, setOpenNewChatModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const { loggedInUser } = useAuthContext();
  const [conversations, setConversations] = useState([]);
  const [openEmojiPicker, setOpenEmojiPicker] = useState<HTMLElement | null>(
    null
  );
  const [messageBody, setMessageBody] = useState<string>("");
  const {
    allMessages,
    setCurrentConversation,
    currentConversation,
    messagesEndRef,
    currentLoggedInMember,
  } = useConversationContext()!;
  useEffect(() => {
    if (openNewChatModal) {
      getAllUsers().then((res) => setAllUsers(res));
    }
  }, [openNewChatModal]);
  useEffect(() => {
    getConversation().then((res) => setConversations(res));
  }, []);

  async function handleCreateConversation() {
    await createConversation({
      members: selectedUsers,
    });
  }
  const drawer = (
    <div>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h5">Kaushal</Typography>
          <IconButton>
            <SettingIcon />
          </IconButton>
        </Grid>
      </Toolbar>
      <Divider />
      <List>
        <ListItem>
          <TextField
            placeholder="Search chats"
            size="small"
            fullWidth
            InputProps={{
              endAdornment: (
                <IconButton>
                  <Search />
                </IconButton>
              ),
            }}
          />
        </ListItem>
        <ListItem>
          <ListItemText primaryTypographyProps={{ variant: "h5" }}>
            Chats
          </ListItemText>
          <ListItemIcon>
            <Avatar>
              <MapsUgcIcon
                onClick={() => {
                  setOpenNewChatModal(true);
                }}
              />
            </Avatar>
          </ListItemIcon>
        </ListItem>
        {conversations?.map((conversation: Conversation) => {
          const conversationTitle =
            conversation?.type === "DIRECT_MESSAGE"
              ? conversation?.members?.find(
                  (member: Member) => member?.userId !== loggedInUser?.user?.id
                )?.user?.name
              : conversation?.groupTitle;
          return (
            <ListItem key={conversation?.id} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(`/chat/${conversation?.id}`, {
                    state: conversation,
                  });
                }}
                selected={currentConversation?.id === conversation?.id}
              >
                <ListItemIcon>
                  <Avatar src={""} />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ variant: "h6" }}>
                  {conversationTitle ?? ""}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
  useEffect(() => {
    if (state && state?.type && setCurrentConversation) {
      setCurrentConversation(state);
    }
  }, [state, setCurrentConversation]);

  return (
    <>
      <Grid container>
        <Grid
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Grid>
        <Grid
          sx={{ ml: { sm: `${drawerWidth}px` } }}
          container
          flexDirection="column"
        >
          <AppBar
            position="fixed"
            sx={{
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
            }}
          >
            <Toolbar>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item display="flex" gap={1} alignItems="center">
                  <Avatar src={""} />
                  <Grid item>
                    <Typography>{currentLoggedInMember?.user?.name}</Typography>
                    <Typography variant="caption">Online</Typography>
                  </Grid>
                </Grid>
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </Grid>
            </Toolbar>
          </AppBar>
          <Toolbar />
          <Grid
            container
            height={`calc(100vh - 134px)`}
            sx={{
              overflowY: "scroll",
              flexWrap: "nowrap",
            }}
            p={2}
            flexDirection="column"
            gap={1}
          >
            {allMessages?.map((message: Message, i: number) => (
              <Grid
                ref={i === allMessages?.length - 1 ? messagesEndRef : null}
                key={message?.id}
                p={1}
                item
                display="flex"
                alignItems="center"
                gap={2}
                maxWidth="35%"
                // following properties if msg by me
                alignSelf={
                  message?.sender?.userId === loggedInUser?.user?.id
                    ? "flex-end"
                    : "flex-start"
                }
                flexDirection={
                  message?.sender?.userId === loggedInUser?.user?.id
                    ? "row-reverse"
                    : "row"
                }
              >
                <Avatar />

                <Grid
                  item
                  display="flex"
                  flexDirection="column"
                  gap={1}
                  variant="elevation"
                  component={Paper}
                  p={1}
                >
                  <Grid container spacing={2}>
                    <Grid item xs zeroMinWidth>
                      <Grid container spacing={2}>
                        <Grid item zeroMinWidth width="100%">
                          <Grid
                            container
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Grid item xs zeroMinWidth>
                              <Typography>{message?.body}</Typography>
                            </Grid>
                            <Grid item alignSelf="flex-start">
                              <IconButton>
                                <MoreVertIcon />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    display="flex"
                    justifyContent={"flex-end"}
                    alignItems="center"
                    gap={1}
                  >
                    <Typography variant="caption">
                      {new Date().toUTCString()}
                    </Typography>
                    <DoneAllIcon sx={{ width: 16, height: 16 }} />
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Grid item px={5} display="flex" alignItems="center" gap={2}>
            <TextField
              value={messageBody}
              placeholder="Send message"
              size="small"
              fullWidth
              multiline
              maxRows={2}
              onChange={(
                event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                setMessageBody(event?.target?.value);
              }}
              InputProps={{
                startAdornment: (
                  <IconButton>
                    <AttachFileIcon />
                  </IconButton>
                ),
                endAdornment: (
                  <Grid item display="flex" alignItems="center" gap={1}>
                    <IconButton
                      onClick={(
                        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
                      ) => {
                        setOpenEmojiPicker(event?.currentTarget);
                      }}
                    >
                      <EmojiEmotionsIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        sendMessage({
                          conversationId: currentConversation?.id,
                          messageBody,
                          senderId: currentConversation?.members?.find(
                            (member: Member) =>
                              member?.userId === loggedInUser?.user?.id
                          )?.id,
                        }).then(() => {
                          return setMessageBody("");
                        });
                      }}
                    >
                      <OutboundIcon />
                    </IconButton>
                  </Grid>
                ),
              }}
            />

            {Boolean(openEmojiPicker) && (
              <Popover
                anchorEl={openEmojiPicker}
                open={Boolean(openEmojiPicker)}
                onClose={() => setOpenEmojiPicker(null)}
              >
                <Picker data={data} onEmojiSelect={console.log} />
              </Popover>
            )}
          </Grid>
        </Grid>
      </Grid>
      {openNewChatModal && (
        <Dialog
          open={openNewChatModal}
          onClose={() => setOpenNewChatModal(false)}
        >
          <DialogTitle>Select users to start a converstation</DialogTitle>
          <DialogContent>
            <Grid container flexDirection="column" gap={2}>
              <TextField
                size="small"
                placeholder="Search users to start conversation"
              />
              {allUsers?.map((user: User) => (
                <List key={user?.id}>
                  <ListItem>
                    <ListItemIcon>
                      <Avatar src={user?.imageUrl ?? ""} />
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{ variant: "h6" }}>
                      {user?.name}
                    </ListItemText>
                    <ListItemIcon
                      onClick={() => {
                        setSelectedUsers((prev: User[]) => {
                          const isUserExist = prev?.find(
                            (prevUser: User) => prevUser?.id === user?.id
                          );
                          if (isUserExist) {
                            return prev?.filter(
                              (prevUser: User) => user?.id !== prevUser?.id
                            );
                          }
                          return [...prev, user];
                        });
                      }}
                    >
                      {selectedUsers?.find((u: User) => u?.id === user?.id) ? (
                        <CheckCircleIcon />
                      ) : (
                        <AddCircleIcon />
                      )}
                    </ListItemIcon>
                  </ListItem>
                </List>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined">Close</Button>
            <Button
              variant="contained"
              onClick={() => {
                handleCreateConversation();
              }}
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
