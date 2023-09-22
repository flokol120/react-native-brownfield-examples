package com.flodoerr.exampleintegration.rest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;

import ru.skornei.restserver.server.converter.BaseConverter;

public class JsonConverter implements BaseConverter {

    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public byte[] writeValueAsBytes(Object value) {
        try {
            return mapper.writeValueAsBytes(value);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public <T> T writeValue(byte[] src, Class<T> valueType) {
        try {
            return mapper.readValue(src, valueType);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
