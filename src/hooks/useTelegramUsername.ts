import { useState } from 'react';
import { initInitData } from '@telegram-apps/sdk';

export function useTelegramUsername() {
    const initData = initInitData();
    if (!initData) {
        return "";
    }
    return initData?.user?.username || "";
}