<?php

namespace Setor7\Oopc\Helper;

class Data extends \Magento\Framework\App\Helper\AbstractHelper
{

    const ENABLE_OPC = 'setor7_oopc/general/enable_in_frontend';
    const META_TITLE = 'setor7_oopc/general/opc_title';



    public function getEnable(){
        return (bool)$this->scopeConfig->getValue(self::ENABLE_OPC);
    }

    public function getMetaTitle(){
        return $this->scopeConfig->getValue(self::META_TITLE);
    }

}
