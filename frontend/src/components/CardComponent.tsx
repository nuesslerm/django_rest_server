import React, { FC } from 'react';
import { Button, Card, Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

interface CardComponentProps {
  children: React.ReactNode;
  title: string;
  actionBtnTitle: string;
  onClickAction: () => void;
  cancelBtnTitle?: string;
  onClickCancel?: () => void;
  navigateBackTo?: string;
  styles?: React.CSSProperties;
}

const CardComponent: FC<CardComponentProps> = ({
  children,
  title,
  actionBtnTitle,
  onClickAction,
  cancelBtnTitle,
  onClickCancel,
  navigateBackTo,
  styles,
}) => {
  const history = useHistory();

  const showCancel = Boolean(
    cancelBtnTitle && (onClickCancel || navigateBackTo)
  );

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      style={{ width: '100%', height: '100%' }}
    >
      <Card raised style={{ padding: '30px', borderRadius: '13px', ...styles }}>
        <Typography
          component="h4"
          variant="h4"
          style={{ borderBottom: '2px solid black' }}
        >
          {title}
        </Typography>
        {children}
        <Grid
          container
          direction="row"
          justify="space-between"
          style={{ padding: '10px 0', width: '100%' }}
        >
          {showCancel && (
            <Button
              color="secondary"
              variant="contained"
              onClick={() => {
                onClickCancel && onClickCancel();
                navigateBackTo && history.push(navigateBackTo);
              }}
              style={{ padding: '5px 15px' }}
            >
              {cancelBtnTitle}
            </Button>
          )}
          <Button
            color="primary"
            variant="contained"
            style={{ padding: '5px 15px' }}
            onClick={onClickAction}
          >
            {actionBtnTitle}
          </Button>
        </Grid>
      </Card>
    </Grid>
  );
};

export default CardComponent;
