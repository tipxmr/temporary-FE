import LoadingButton from "@mui/lab/LoadingButton";
import { Button, Chip, Container, FormGroup, Grid, TextField } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ChangeEvent, useState } from "react";
import { Provider } from "react-redux";

import store, { useAppDispatch, useAppSelector } from "../../store";
import { close, open } from "../../features/wallet";
import { start } from "../../features/synchronisation";
import { Box, SxProps } from "@mui/system";

const Progress = ({ value, sx = [] }: { value: number, sx: SxProps }) => {
  const color = value === 0 ? "warning" : value === 100 ? "success" : "info";
  return <Chip sx={sx} label={`${value}%`} color={color} />;
};

const Wallet = () => {
  const online = useAppSelector((state) => state.wallet.open);
  const loading = useAppSelector((state) => state.wallet.loading);
  const progress = useAppSelector((state) => state.synchronisation.progress);

  const dispatch = useAppDispatch();
  const [mnemonic, setMnemonic] = useState("");

  const handleOpen = () => {
    dispatch(open(mnemonic));
  };

  const handleClose = () => {
    dispatch(close());
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMnemonic(event.target.value);
  };

  const handleClick = () => {
    if (online) {
      handleClose();
    } else {
      handleOpen();
    }
  };

  const handleStart = () => {
    dispatch(start());
  }

  return (
    <Container maxWidth="sm">
      <FormGroup row sx={{ mb: 2 }}>
        <TextField
          onChange={handleChange}
          disabled={loading === "pending" || online}
          sx={{ flex: 1 }}
        />
        <LoadingButton loading={loading === "pending"} onClick={handleClick}>
          {online ? "Disconnect" : "Connect"}
        </LoadingButton>
      </FormGroup>

      <Box sx={{ mb: 2 }}>
        <Chip
          sx={{ mr: 1 }}
          color={online ? "success" : "error"}
          label={`Status: ${online ? "online" : "offline"}`}
        />

        <Chip
          color={loading === "idle" ? "default" : "info"}
          label={`Loading: ${loading}`}
        />
      </Box>

      <Box sx={{ display: 'flex', mb: 2 }}>
        <Button onClick={handleStart} color="primary" disabled={!online}>
          Start
        </Button>
        
        <Box sx={{ flex: 1 }} />

        <Progress sx={{ opacity: online ? 1 : 0.5 }} value={progress} />
      </Box>
    </Container>
  );
};

export default {
  title: "Wallet / Demo",
  component: Wallet,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
} as ComponentMeta<typeof Wallet>;

const Template: ComponentStory<typeof Wallet> = () => <Wallet />;

export const Basic = Template.bind({});
Basic.args = {};
